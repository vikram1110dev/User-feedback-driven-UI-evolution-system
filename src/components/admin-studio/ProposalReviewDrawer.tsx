import React, { useState } from 'react';
import { useEvolutionSystem } from '../../context/EvolutionSystemContext';
import { UIChangeProposal } from '../../types/proposal';
import { CodeDiffViewer } from './CodeDiffViewer';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  CornerDownRight, 
  TrendingUp, 
  Clock, 
  FileCode, 
  MessageSquare,
  Check
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProposalReviewDrawerProps {
  proposal: UIChangeProposal;
}

export const ProposalReviewDrawer: React.FC<ProposalReviewDrawerProps> = ({ proposal }) => {
  const { 
    feedbacks, 
    approveProposal, 
    rejectProposal, 
    requestProposalModifications,
    setActiveView
  } = useEvolutionSystem();

  const [adminNotes, setAdminNotes] = useState('');
  const [isActionLoading, setIsActionLoading] = useState(false);

  const linkedFeedback = feedbacks.find(f => f.id === proposal.feedbackId);

  const handleApprove = async () => {
    setIsActionLoading(true);
    try {
      await approveProposal(proposal.id, adminNotes);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReject = () => {
    rejectProposal(proposal.id, adminNotes);
  };

  const handleRequestMod = () => {
    requestProposalModifications(proposal.id, adminNotes);
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'critical': return <Badge variant="danger" size="sm" dot>Critical Priority</Badge>;
      case 'high': return <Badge variant="warning" size="sm" dot>High Priority</Badge>;
      case 'medium': return <Badge variant="cyan" size="sm" dot>Medium Priority</Badge>;
      default: return <Badge variant="neutral" size="sm">Low Priority</Badge>;
    }
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case 'pending-admin-review': return <Badge variant="warning" size="md" dot>Pending Admin Review</Badge>;
      case 'admin-approved': return <Badge variant="success" size="md" dot>Approved by Admin</Badge>;
      case 'admin-rejected': return <Badge variant="danger" size="md" dot>Rejected</Badge>;
      case 'modifications-requested': return <Badge variant="purple" size="md" dot>Modifications Requested</Badge>;
      case 'ready-to-deploy': return <Badge variant="cyan" size="md" dot>Ready to Deploy</Badge>;
      case 'deployed': return <Badge variant="success" size="md" dot>Deployed to Live Prod</Badge>;
      default: return <Badge variant="neutral" size="md">{s}</Badge>;
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      
      {/* Header Banner */}
      <div className="pro-card p-5 sm:p-6 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[11px] text-indigo-400 font-bold uppercase">Proposal #{proposal.id.slice(-6)}</span>
              {getPriorityBadge(proposal.priority)}
              {getStatusBadge(proposal.status)}
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">{proposal.title}</h2>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Created {new Date(proposal.createdAt).toLocaleTimeString()} • Target: <strong className="text-slate-200 capitalize">{proposal.affectedPage}</strong></span>
            </p>
          </div>

          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">HITL Governance</p>
              <p className="text-[10px] text-indigo-300/80">Admin sign-off required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Feedback Context vs AI Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* 1. Original User Feedback Card */}
        <div className="pro-card p-5 rounded-3xl border border-white/10 space-y-3.5">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">User Telemetry Payload</h3>
            </div>
            {linkedFeedback && (
              <Badge variant="neutral" size="sm">
                Rating: {linkedFeedback.rating} / 5 ⭐
              </Badge>
            )}
          </div>

          {linkedFeedback ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/80">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-[10px]">
                  {linkedFeedback.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white text-xs">{linkedFeedback.author.name}</p>
                  <p className="text-[10px] text-slate-400">{linkedFeedback.author.role} • {linkedFeedback.deviceContext.toUpperCase()} viewport</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#080b11] border border-white/5 space-y-1">
                <p className="font-semibold text-slate-200 text-xs">"{linkedFeedback.title}"</p>
                <p className="text-slate-400 text-xs leading-relaxed">{linkedFeedback.description}</p>
              </div>

              {linkedFeedback.targetElementSelector && (
                <div className="flex items-center gap-1.5 text-[11px] text-cyan-300">
                  <CornerDownRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Target: <code className="font-mono bg-cyan-500/10 px-1.5 py-0.5 rounded text-[10px]">{linkedFeedback.targetElementSelector}</code></span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-500">Linked user feedback record</p>
          )}
        </div>

        {/* 2. AI Root Cause & Diagnostic */}
        <div className="pro-card p-5 rounded-3xl border border-white/10 space-y-3.5">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">AI Diagnostic & Solution</h3>
            </div>
            <Badge variant="cyan" size="sm">
              +{proposal.expectedImpact.accessibilityScoreDelta}% a11y Delta
            </Badge>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="font-semibold text-slate-400 text-[10px] uppercase tracking-wider block mb-1">Root Cause Analysis:</span>
              <p className="p-2.5 rounded-xl bg-[#080b11] border border-white/5 text-slate-300 leading-relaxed text-xs">
                {proposal.rootCauseAnalysis}
              </p>
            </div>

            <div>
              <span className="font-semibold text-slate-400 text-[10px] uppercase tracking-wider block mb-1">Recommended Solution:</span>
              <p className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-200 leading-relaxed text-xs">
                {proposal.suggestedSolution}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Risk Assessment & UX Impact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-start gap-2.5 text-xs">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white text-xs">Risk Evaluation ({proposal.riskAssessment.level.toUpperCase()})</p>
            <p className="text-slate-400 text-[11px] mt-0.5">{proposal.riskAssessment.mitigationStrategy}</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-start gap-2.5 text-xs">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white text-xs">Expected Conversion & UX Gain</p>
            <p className="text-slate-400 text-[11px] mt-0.5">{proposal.expectedImpact.uxImprovement}</p>
          </div>
        </div>
      </div>

      {/* Code Diffs */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Proposed Component Patches ({proposal.patches.length})</h3>
          </div>
          <span className="text-[11px] text-slate-400">Isolated Staging Branch</span>
        </div>

        {proposal.patches.map((patch, idx) => (
          <CodeDiffViewer key={idx} patch={patch} />
        ))}
      </div>

      {/* Admin Decision Console */}
      <div className="pro-card p-5 rounded-3xl border border-indigo-500/30 space-y-3.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Administrator Review Decision</h3>
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Admin Review Notes & Sign-Off Rationale (Optional)
          </label>
          <textarea
            rows={2}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Add specific instructions, sign-off rationale, or requested adjustments..."
            className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Button
              variant="danger"
              size="sm"
              onClick={handleReject}
              disabled={proposal.status === 'admin-rejected' || proposal.status === 'deployed'}
              icon={<XCircle className="w-3.5 h-3.5" />}
            >
              Reject
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRequestMod}
              disabled={proposal.status === 'deployed'}
            >
              Request Changes
            </Button>
          </div>

          <div>
            {proposal.status === 'ready-to-deploy' ? (
              <Button
                variant="gradient"
                size="md"
                onClick={() => setActiveView('live-preview-split')}
                icon={<Check className="w-4 h-4" />}
              >
                Go to Live Preview & Deploy
              </Button>
            ) : (
              <Button
                variant="success"
                size="md"
                loading={isActionLoading}
                onClick={handleApprove}
                disabled={proposal.status === 'deployed'}
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Approve & Execute Test Pipeline
              </Button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
