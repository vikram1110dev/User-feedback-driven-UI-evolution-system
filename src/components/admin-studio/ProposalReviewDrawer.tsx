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
    reSynthesizeProposalWithPrompt,
    geminiApiKey,
    selectedModel,
    setActiveView
  } = useEvolutionSystem();

  const [adminNotes, setAdminNotes] = useState('');
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isReSynthesizing, setIsReSynthesizing] = useState(false);

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

  const handleReSynthesize = async () => {
    if (!customPrompt.trim()) return;
    setIsReSynthesizing(true);
    try {
      await reSynthesizeProposalWithPrompt(proposal.id, customPrompt);
      setCustomPrompt('');
    } finally {
      setIsReSynthesizing(false);
    }
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'critical': return <Badge variant="danger" size="md" dot>Critical Priority</Badge>;
      case 'high': return <Badge variant="warning" size="md" dot>High Priority</Badge>;
      case 'medium': return <Badge variant="cyan" size="md" dot>Medium Priority</Badge>;
      default: return <Badge variant="neutral" size="md">Low Priority</Badge>;
    }
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case 'pending-admin-review': return <Badge variant="warning" size="md" dot>Pending Admin Review</Badge>;
      case 'admin-approved': return <Badge variant="success" size="md" dot>Approved by Admin</Badge>;
      case 'admin-rejected': return <Badge variant="danger" size="md" dot>Rejected</Badge>;
      case 'modifications-requested': return <Badge variant="purple" size="md" dot>Modifications Requested</Badge>;
      case 'ready-to-deploy': return <Badge variant="teal" size="md" dot>Ready to Deploy</Badge>;
      case 'deployed': return <Badge variant="success" size="md" dot>Deployed to Live Prod</Badge>;
      default: return <Badge variant="neutral" size="md">{s}</Badge>;
    }
  };

  const promptChips = [
    'Enforce WCAG AAA 7:1 Contrast',
    'Glassmorphic backdrop blur & teal glow',
    'Expand touch target to 52px minimum',
    'Add responsive mobile flex wrapping'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="font-mono text-xs text-teal-800 font-extrabold uppercase bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-200">
                Proposal #{proposal.id.slice(-6)}
              </span>
              {getPriorityBadge(proposal.priority)}
              {getStatusBadge(proposal.status)}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">{proposal.title}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Created {new Date(proposal.createdAt).toLocaleTimeString()} • Target: <strong className="text-slate-800 capitalize">{proposal.affectedPage}</strong></span>
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs sm:text-sm flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-teal-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-900">HITL Governance</p>
              <p className="text-xs text-teal-700 font-medium">Admin sign-off required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive AI Prompt Tuning & Directive Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-lg text-white space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Interactive AI Prompt Tuning & Mutation Directives</h3>
              <p className="text-xs text-slate-400">Refine the AI code patch with custom styling tokens, constraints, or directives</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-teal-300 font-semibold bg-teal-950/80 px-2.5 py-1 rounded-lg border border-teal-800">
            {geminiApiKey ? `⚡ ${selectedModel}` : '🤖 Autonomous Sim Engine'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Quick Directives:</span>
          {promptChips.map((chip, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCustomPrompt(chip)}
              className="text-xs px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              + {chip}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g. 'Use emerald-500 gradient, add micro-hover bounce and 48px touch target'..."
            className="flex-1 w-full px-4 py-2.5 rounded-xl bg-slate-850 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-400 font-medium"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleReSynthesize();
            }}
          />
          <Button
            variant="gradient"
            size="sm"
            onClick={handleReSynthesize}
            loading={isReSynthesizing}
            disabled={!customPrompt.trim()}
            icon={<Sparkles className="w-4 h-4" />}
          >
            ⚡ Re-Synthesize Patch
          </Button>
        </div>
      </div>

      {/* Grid: Feedback Context vs AI Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Original User Feedback Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-5 h-5 text-teal-600" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">User Telemetry Payload</h3>
            </div>
            {linkedFeedback && (
              <Badge variant="neutral" size="sm">
                Rating: {linkedFeedback.rating} / 5 ⭐
              </Badge>
            )}
          </div>

          {linkedFeedback ? (
            <div className="space-y-3.5 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {linkedFeedback.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{linkedFeedback.author.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{linkedFeedback.author.role} • {linkedFeedback.deviceContext.toUpperCase()} viewport</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <p className="font-bold text-slate-900 text-sm">"{linkedFeedback.title}"</p>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{linkedFeedback.description}</p>
              </div>

              {linkedFeedback.targetElementSelector && (
                <div className="flex items-center gap-2 text-xs text-teal-800 font-medium">
                  <CornerDownRight className="w-4 h-4 text-slate-400" />
                  <span>Target: <code className="font-mono bg-teal-100 text-teal-900 px-2 py-0.5 rounded font-bold">{linkedFeedback.targetElementSelector}</code></span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Linked user feedback record</p>
          )}
        </div>

        {/* 2. AI Root Cause & Diagnostic */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">AI Diagnostic & Solution</h3>
            </div>
            <Badge variant="teal" size="sm">
              +{proposal.expectedImpact.accessibilityScoreDelta}% a11y Delta
            </Badge>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="font-extrabold text-slate-600 text-xs uppercase tracking-wider block mb-1.5">Root Cause Analysis:</span>
              <p className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed font-medium">
                {proposal.rootCauseAnalysis}
              </p>
            </div>

            <div>
              <span className="font-extrabold text-slate-600 text-xs uppercase tracking-wider block mb-1.5">Recommended Solution:</span>
              <p className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 text-teal-900 leading-relaxed font-medium">
                {proposal.suggestedSolution}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Risk Assessment & UX Impact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 text-sm">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Risk Evaluation ({proposal.riskAssessment.level.toUpperCase()})</p>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">{proposal.riskAssessment.mitigationStrategy}</p>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 text-sm">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 flex-shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Expected Conversion & UX Gain</p>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">{proposal.expectedImpact.uxImprovement}</p>
          </div>
        </div>
      </div>

      {/* Code Diffs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-teal-600" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">Proposed Component Patches ({proposal.patches.length})</h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">Isolated Staging Branch</span>
        </div>

        {proposal.patches.map((patch, idx) => (
          <CodeDiffViewer key={idx} patch={patch} />
        ))}
      </div>

      {/* Admin Decision Console */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-teal-500 shadow-md space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-teal-600" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Administrator Review Decision</h3>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
            Admin Review Notes & Sign-Off Rationale (Optional)
          </label>
          <textarea
            rows={2}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Add specific instructions, sign-off rationale, or requested adjustments..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 font-medium resize-none"
          />
        </div>

        <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <Button
              variant="danger"
              size="md"
              onClick={handleReject}
              disabled={proposal.status === 'admin-rejected' || proposal.status === 'deployed'}
              icon={<XCircle className="w-4 h-4" />}
            >
              Reject
            </Button>
            <Button
              variant="secondary"
              size="md"
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
                size="lg"
                onClick={() => setActiveView('live-preview-split')}
                icon={<Check className="w-5 h-5" />}
              >
                Go to Live Preview & Deploy
              </Button>
            ) : (
              <Button
                variant="gradient"
                size="lg"
                loading={isActionLoading}
                onClick={handleApprove}
                disabled={proposal.status === 'deployed'}
                icon={<CheckCircle2 className="w-5 h-5" />}
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
