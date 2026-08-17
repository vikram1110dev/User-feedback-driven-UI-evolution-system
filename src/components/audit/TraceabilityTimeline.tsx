import React from 'react';
import { useEvolutionSystem } from '../../context/EvolutionSystemContext';
import { 
  History, 
  RotateCcw, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  GitCommit, 
  FileText, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const TraceabilityTimeline: React.FC = () => {
  const { 
    deployments, 
    auditLogs, 
    currentProdVersion, 
    rollbackToVersion, 
    feedbacks,
    proposals 
  } = useEvolutionSystem();

  const handleExportAudit = () => {
    const report = {
      exportedAt: new Date().toISOString(),
      currentProductionVersion: currentProdVersion,
      totalDeployments: deployments.length,
      totalFeedbacks: feedbacks.length,
      totalProposals: proposals.length,
      deployments,
      auditLogs,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evolvui-audit-trail-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'DEPLOYED_TO_PROD': return <Badge variant="success" size="sm" dot>Deployed to Production</Badge>;
      case 'ADMIN_APPROVED': return <Badge variant="primary" size="sm">Admin Approved</Badge>;
      case 'TEST_PIPELINE_PASSED': return <Badge variant="cyan" size="sm">Pipeline Passed</Badge>;
      case 'PROPOSAL_GENERATED': return <Badge variant="purple" size="sm">Proposal Generated</Badge>;
      case 'ROLLED_BACK': return <Badge variant="danger" size="sm">Rolled Back</Badge>;
      default: return <Badge variant="neutral" size="sm">{action}</Badge>;
    }
  };

  return (
    <div className="py-6 px-4 max-w-6xl mx-auto space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="purple" size="sm" dot>Immutable Audit Trail</Badge>
            <span className="text-xs text-slate-400">Full lifecycle traceability from user feedback to git commit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Version History & Change Governance
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track decisions, AI diagnoses, test results, and production rollbacks with complete transparency.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={handleExportAudit}
          icon={<Download className="w-4 h-4" />}
        >
          Export Audit Report (JSON)
        </Button>
      </div>

      {/* Production Version Releases Table */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="p-5 bg-slate-900/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Production Release History</h3>
          </div>
          <span className="text-xs text-slate-400">{deployments.length} Release(s) Recorded</span>
        </div>

        <div className="divide-y divide-white/5">
          {deployments.map((d) => {
            const isCurrent = d.version === currentProdVersion;

            return (
              <div key={d.version} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold font-display text-white">{d.version}</span>
                    {isCurrent ? (
                      <Badge variant="success" size="sm" dot>Active in Production</Badge>
                    ) : (
                      <Badge variant="neutral" size="sm">{d.status}</Badge>
                    )}
                    <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      commit #{d.commitHash}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{d.changeSummary}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    <span>Deployed {new Date(d.deployedAt).toLocaleString()} by <strong>{d.deployedBy}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">CSAT: {d.metrics.userSatisfactionRating} / 5.0 ⭐</span>
                    <span>•</span>
                    <span className="text-cyan-400 font-medium">Conv Delta: {d.metrics.conversionDelta}</span>
                  </div>
                </div>

                {/* Rollback button */}
                {!isCurrent && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => rollbackToVersion(d.version)}
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    Rollback to {d.version}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Audit Logs Timeline */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <History className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Continuous Lifecycle Audit Event Stream</h3>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
          {auditLogs.map((log) => (
            <div key={log.id} className="relative group">
              
              {/* Dot */}
              <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-950 group-hover:scale-125 transition-transform" />

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getActionBadge(log.action)}
                    <span className="text-xs font-semibold text-slate-300">{log.actor}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{log.details}</p>

                {log.metadata && Object.keys(log.metadata).length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {Object.entries(log.metadata).map(([k, v]) => (
                      <span key={k} className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                        {k}: <strong className="text-indigo-300">{v}</strong>
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
