import React, { useState } from 'react';
import { useEvolutionSystem } from '../../context/EvolutionSystemContext';
import { UserFeedback } from '../../types/feedback';
import { 
  Inbox, 
  Search, 
  Star, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ArrowRight, 
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
      case 'new': return <Badge variant="teal" size="sm" dot>New Feedback</Badge>;
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

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col h-full">
      
      {/* Header Search & Filter */}
      <div className="p-5 border-b border-slate-200 space-y-4 bg-slate-50/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Inbox className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">Feedback Inbox</h3>
            <span className="text-xs font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">({feedbacks.length})</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search feedback, pages, components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 font-medium"
          />
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {(['all', 'pending', 'new', 'deployed'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Feedbacks List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[640px]">
        {filteredFeedbacks.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">
            <Inbox className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="font-medium">No feedback matching your filters.</p>
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
                    ? 'bg-teal-50/70 border-l-4 border-teal-600'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(fb.deviceContext)}
                    <span className="text-xs font-bold text-slate-700 capitalize">{fb.targetPage} Page</span>
                  </div>
                  {getStatusBadge(fb.status)}
                </div>

                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{fb.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed font-medium">
                  {fb.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">{fb.author.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      {fb.rating} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    </span>
                  </div>
                  {linkedProp && (
                    <span className="text-teal-700 font-bold flex items-center gap-1">
                      Proposal #{linkedProp.id.slice(-6)}
                      <ArrowRight className="w-3.5 h-3.5" />
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
