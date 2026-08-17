import React, { useState, useEffect } from 'react';
import { useEvolutionSystem } from '../../context/EvolutionSystemContext';
import { UserFeedback, FeedbackCategory } from '../../types/feedback';
import { 
  Inbox, 
  Search, 
  Star, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ArrowRight, 
  Plus, 
  Zap, 
  Filter, 
  Trash2, 
  Sparkles, 
  Clock, 
  TrendingUp,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { SYNTHETIC_PERSONA_SCENARIOS, generateSyntheticFeedback } from '../../engine/syntheticFeedback';

interface FeedbackInboxViewProps {
  onSelectFeedback: (fb: UserFeedback) => void;
  selectedFeedbackId?: string;
}

export const FeedbackInboxView: React.FC<FeedbackInboxViewProps> = ({
  onSelectFeedback,
  selectedFeedbackId,
}) => {
  const { 
    feedbacks, 
    proposals, 
    setActiveProposal, 
    submitUserFeedback, 
    showToast,
    setCurrentPage,
    setActiveView
  } = useEvolutionSystem();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'new' | 'deployed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'rating-low' | 'priority'>('newest');
  const [isLivePolling, setIsLivePolling] = useState(false);

  // Auto-polling dynamic simulator
  useEffect(() => {
    if (!isLivePolling) return;

    const interval = setInterval(() => {
      // Pick a random scenario not yet submitted if possible
      const randomScenario = SYNTHETIC_PERSONA_SCENARIOS[Math.floor(Math.random() * SYNTHETIC_PERSONA_SCENARIOS.length)];
      const syntheticFb = generateSyntheticFeedback(randomScenario);
      
      submitUserFeedback(syntheticFb);
      showToast(`⚡ Dynamic Feed: Captured new user feedback from ${syntheticFb.author.name}!`);
    }, 7000);

    return () => clearInterval(interval);
  }, [isLivePolling, submitUserFeedback, showToast]);

  const handleSimulateOne = async () => {
    const randomScenario = SYNTHETIC_PERSONA_SCENARIOS[Math.floor(Math.random() * SYNTHETIC_PERSONA_SCENARIOS.length)];
    const syntheticFb = generateSyntheticFeedback(randomScenario);
    await submitUserFeedback(syntheticFb);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <Badge variant="teal" size="sm" dot>New</Badge>;
      case 'proposal-created': return <Badge variant="warning" size="sm" dot>Proposal Pending</Badge>;
      case 'approved': return <Badge variant="success" size="sm" dot>Approved</Badge>;
      case 'rejected': return <Badge variant="danger" size="sm">Rejected</Badge>;
      case 'deployed': return <Badge variant="success" size="sm">Deployed</Badge>;
      default: return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return <Smartphone className="w-4 h-4 text-teal-700" />;
      case 'tablet': return <Tablet className="w-4 h-4 text-teal-700" />;
      default: return <Monitor className="w-4 h-4 text-teal-700" />;
    }
  };

  // Filter & Sort
  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchesSearch = fb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fb.targetPage.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (selectedCategory !== 'all' && fb.category !== selectedCategory) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'new') return fb.status === 'new' || fb.status === 'analyzed';
    if (selectedFilter === 'pending') return fb.status === 'proposal-created';
    if (selectedFilter === 'deployed') return fb.status === 'deployed';
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating-low') return a.rating - b.rating;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const pendingCount = feedbacks.filter(f => f.status === 'proposal-created' || f.status === 'new').length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col h-full">
      
      {/* Header Controls */}
      <div className="p-5 border-b border-slate-200 space-y-4 bg-slate-50/80">
        
        {/* Title & Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Feedback Inbox</h3>
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                  {feedbacks.length}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Real-time user feedback telemetry stream</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLivePolling(!isLivePolling)}
              title={isLivePolling ? 'Pause Live Stream' : 'Start Live Telemetry Auto-Poll'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isLivePolling
                  ? 'bg-rose-50 text-rose-700 border border-rose-300 animate-pulse'
                  : 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
              }`}
            >
              {isLivePolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-teal-600" />}
              <span>{isLivePolling ? 'Live Polling' : 'Auto Stream'}</span>
            </button>

            <button
              onClick={handleSimulateOne}
              title="Inject New Feedback Item"
              className="p-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by description, page, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 font-medium shadow-2xs"
          />
        </div>

        {/* Filters & Sorting Row */}
        <div className="flex items-center justify-between gap-2 text-xs font-semibold overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5">
            {(['all', 'pending', 'new', 'deployed'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-xl capitalize transition-all whitespace-nowrap cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-teal-600 text-white shadow-2xs font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold focus:outline-none focus:border-teal-500 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="rating-low">Lowest Rating</option>
          </select>
        </div>

      </div>

      {/* Feedbacks List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[640px]">
        {filteredFeedbacks.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm space-y-3">
            <Inbox className="w-12 h-12 mx-auto text-slate-300" />
            <p className="font-bold text-slate-700">No feedback matching your filters.</p>
            <Button variant="secondary" size="sm" onClick={handleSimulateOne} icon={<Plus className="w-4 h-4" />}>
              Inject Sample Feedback
            </Button>
          </div>
        ) : (
          filteredFeedbacks.map((fb) => {
            const isSelected = fb.id === selectedFeedbackId;
            const linkedProp = proposals.find(p => p.id === fb.proposalId);

            return (
              <div
                key={fb.id}
                onClick={() => {
                  onSelectFeedback(fb);
                  if (linkedProp) setActiveProposal(linkedProp);
                }}
                className={`p-5 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-teal-50/80 border-l-4 border-teal-600 shadow-xs'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(fb.deviceContext)}
                    <span className="text-xs font-extrabold text-slate-800 capitalize bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                      {fb.targetPage} Screen
                    </span>
                  </div>
                  {getStatusBadge(fb.status)}
                </div>

                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{fb.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed font-medium">
                  {fb.description}
                </p>

                {/* Footer Metadata & Direct Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{fb.author.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      {fb.rating} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    </span>
                  </div>

                  {linkedProp ? (
                    <span className="text-teal-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      AI Proposal #{linkedProp.id.slice(-6)}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPage(fb.targetPage as any);
                        setActiveView('target-app');
                      }}
                      className="text-xs text-slate-500 hover:text-teal-700 font-bold flex items-center gap-1"
                    >
                      <span>Inspect Screen</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
