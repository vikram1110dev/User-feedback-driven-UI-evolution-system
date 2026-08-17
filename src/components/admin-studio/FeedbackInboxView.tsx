import React, { useState } from 'react';
import { useEvolutionSystem } from '../../context/EvolutionSystemContext';
import { UserFeedback } from '../../types/feedback';
import { 
  Inbox, 
  Search, 
  Filter, 
  Star, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ArrowRight, 
  Clock, 
  Tag, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../ui/Badge';

interface FeedbackInboxViewProps {
  onSelectFeedback: (fb: UserFeedback) => void;
  selectedFeedbackId?: string;
}

export const FeedbackInboxView: React.FC<FeedbackInboxViewProps> = ({
  onSelectFeedback,
  selectedFeedbackId,
}) => {
  const { feedbacks, proposals, setActiveProposal } = useEvolutionSystem();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'new' | 'pending' | 'deployed'>('all');

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchesSearch = fb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fb.targetPage.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'new') return fb.status === 'new' || fb.status === 'analyzed';
    if (selectedFilter === 'pending') return fb.status === 'proposal-created';
    if (selectedFilter === 'deployed') return fb.status === 'deployed';
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <Badge variant="cyan" size="sm" dot>New Feedback</Badge>;
      case 'proposal-created': return <Badge variant="warning" size="sm" dot>Proposal Pending Review</Badge>;
      case 'approved': return <Badge variant="success" size="sm" dot>Approved</Badge>;
      case 'rejected': return <Badge variant="danger" size="sm">Rejected</Badge>;
      case 'deployed': return <Badge variant="success" size="sm">Deployed</Badge>;
      default: return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return <Smartphone className="w-3.5 h-3.5 text-indigo-400" />;
      case 'tablet': return <Tablet className="w-3.5 h-3.5 text-indigo-400" />;
      default: return <Monitor className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  return (
    <div className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col h-full">
      
      {/* Header Search & Filter */}
      <div className="p-4 border-b border-white/10 space-y-3 bg-slate-900/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Feedback Inbox</h3>
            <span className="text-xs text-slate-400">({feedbacks.length})</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search feedback, pages, components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-white/5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
          {(['all', 'pending', 'new', 'deployed'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Feedbacks List */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5 max-h-[600px]">
        {filteredFeedbacks.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            <Inbox className="w-8 h-8 mx-auto text-slate-600 mb-2 opacity-50" />
            <p>No feedback matching your filters.</p>
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
                className={`p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-950/40 border-l-4 border-indigo-500'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(fb.deviceContext)}
                    <span className="text-[11px] font-bold text-slate-300 capitalize">{fb.targetPage} Page</span>
                  </div>
                  {getStatusBadge(fb.status)}
                </div>

                <h4 className="text-xs font-semibold text-white line-clamp-1">{fb.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {fb.description}
                </p>

                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span>{fb.author.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-400">
                      {fb.rating} <Star className="w-2.5 h-2.5 fill-amber-400" />
                    </span>
                  </div>
                  {linkedProp && (
                    <span className="text-indigo-400 font-medium flex items-center gap-1">
                      AI Proposal #{linkedProp.id.slice(-6)}
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
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
