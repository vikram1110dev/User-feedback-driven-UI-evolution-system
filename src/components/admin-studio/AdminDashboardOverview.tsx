import React, { useState } from 'react';
import { useEvolutionSystem } from '../../context/EvolutionSystemContext';
import { FeedbackInboxView } from './FeedbackInboxView';
import { ProposalReviewDrawer } from './ProposalReviewDrawer';
import { StatCard } from '../ui/StatCard';
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  FlaskConical, 
  MessageSquare, 
  ArrowUpRight 
} from 'lucide-react';
import { UserFeedback } from '../../types/feedback';

export const AdminDashboardOverview: React.FC = () => {
  const { 
    feedbacks, 
    proposals, 
    activeProposal, 
    setActiveProposal, 
    deployments 
  } = useEvolutionSystem();

  const [selectedFeedback, setSelectedFeedback] = useState<UserFeedback | null>(feedbacks[0] || null);

  const pendingProposalsCount = proposals.filter(p => p.status === 'pending-admin-review').length;
  const approvedProposalsCount = proposals.filter(p => p.status === 'admin-approved' || p.status === 'ready-to-deploy' || p.status === 'deployed').length;

  const currentReviewProposal = activeProposal || proposals[0];

  const handleSelectFeedback = (fb: UserFeedback) => {
    setSelectedFeedback(fb);
    const prop = proposals.find(p => p.id === fb.proposalId);
    if (prop) setActiveProposal(prop);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Human-in-the-Loop Governance Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review user feedback, inspect AI UI Change Proposals, approve modifications, and control frontend deployments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Zero Unsupervised Deployments Policy</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Captured Feedbacks"
          value={feedbacks.length}
          delta="+4 new"
          icon={<MessageSquare className="w-5 h-5" />}
        />
        <StatCard
          title="Pending Admin Review"
          value={pendingProposalsCount}
          delta={pendingProposalsCount > 0 ? 'Requires Action' : 'All Clear'}
          deltaType={pendingProposalsCount > 0 ? 'negative' : 'positive'}
          icon={<AlertCircle className="w-5 h-5" />}
        />
        <StatCard
          title="Approved Proposals"
          value={approvedProposalsCount}
          delta="100% test pass"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <StatCard
          title="Production Releases"
          value={deployments.length}
          delta="Active"
          icon={<Sparkles className="w-5 h-5" />}
        />
      </div>

      {/* Main Split Layout: Left Inbox, Right Proposal Reviewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Feedback Inbox (4 cols) */}
        <div className="lg:col-span-4 h-full">
          <FeedbackInboxView
            onSelectFeedback={handleSelectFeedback}
            selectedFeedbackId={selectedFeedback?.id}
          />
        </div>

        {/* Right Column: Proposal Review Drawer (8 cols) */}
        <div className="lg:col-span-8">
          {currentReviewProposal ? (
            <ProposalReviewDrawer proposal={currentReviewProposal} />
          ) : (
            <div className="glass-card p-12 rounded-3xl border border-white/10 text-center text-slate-400">
              <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
              <h3 className="text-base font-bold text-white">Select a Proposal to Review</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Click any feedback item from the inbox to inspect the AI diagnostic, proposed code patches, and approval controls.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
