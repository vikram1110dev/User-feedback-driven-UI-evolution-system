import React, { useState } from 'react';
import { useEvolutionSystem } from '../../context/EvolutionSystemContext';
import { FeedbackInboxView } from './FeedbackInboxView';
import { ProposalReviewDrawer } from './ProposalReviewDrawer';
import { StatCard } from '../ui/StatCard';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare 
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
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Human-in-the-Loop Governance Studio
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 font-medium">
            Review user feedback, inspect AI UI Change Proposals, approve modifications, and control frontend deployments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-sm font-bold flex items-center gap-2.5 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>Zero Unsupervised Deployments Policy</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
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
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center shadow-md">
              <Sparkles className="w-14 h-14 text-teal-600 mx-auto mb-4 opacity-70" />
              <h3 className="text-xl font-bold text-slate-900">Select a Proposal to Review</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                Click any feedback item from the inbox to inspect the AI diagnostic, proposed code patches, and approval controls.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
