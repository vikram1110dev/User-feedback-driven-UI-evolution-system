import React from 'react';
import { useEvolutionSystem } from '../../context/EvolutionSystemContext';
import { 
  History, 
  RotateCcw, 
  Download, 
  GitCommit, 
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
      case 'ADMIN_APPROVED': return <Badge variant="teal" size="sm">Admin Approved</Badge>;
      case 'TEST_PIPELINE_PASSED': return <Badge variant="cyan" size="sm">Pipeline Passed</Badge>;
      case 'PROPOSAL_GENERATED': return <Badge variant="purple" size="sm">Proposal Generated</Badge>;
      case 'ROLLED_BACK': return <Badge variant="danger" size="sm">Rolled Back</Badge>;
      default: return <Badge variant="neutral" size="sm">{action}</Badge>;
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-8 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <Badge variant="teal" size="md" dot>Immutable Audit Trail</Badge>
            <span className="text-sm text-slate-500 font-medium">Full lifecycle traceability from user feedback to git commit</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Version History & Change Governance
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 font-medium">
            Track decisions, AI diagnoses, test results, and production rollbacks with complete transparency.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={handleExportAudit}
          icon={<Download className="w-5 h-5 text-teal-700" />}
        >
          Export Audit Report (JSON)
        </Button>
      </div>

      {/* Production Version Releases Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GitCommit className="w-5 h-5 text-teal-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Production Release History</h3>
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-600 bg-slate-200 px-3 py-1 rounded-full">{deployments.length} Release(s) Recorded</span>
        </div>

        <div className="divide-y divide-slate-100">
          {deployments.map((d) => {
            const isCurrent = d.version === currentProdVersion;

            return (
              <div key={d.version} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-slate-50/60 transition-colors">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-lg font-black font-display text-slate-900">{d.version}</span>
                    {isCurrent ? (
                      <Badge variant="success" size="sm" dot>Active in Production</Badge>
                    ) : (
                      <Badge variant="neutral" size="sm">{d.status}</Badge>
                    )}
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-200">
                      commit #{d.commitHash}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 font-medium">{d.changeSummary}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 font-medium">
                    <span>Deployed {new Date(d.deployedAt).toLocaleString()} by <strong className="text-slate-800">{d.deployedBy}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">CSAT: {d.metrics.userSatisfactionRating} / 5.0 ⭐</span>
                    <span>•</span>
                    <span className="text-teal-700 font-bold">Conv Delta: {d.metrics.conversionDelta}</span>
                  </div>
                </div>

                {/* Rollback button */}
                {!isCurrent && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => rollbackToVersion(d.version)}
                    icon={<RotateCcw className="w-4 h-4 text-rose-600" />}
                  >
                    Rollback to {d.version}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit Logs Stream */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
          <History className="w-5 h-5 text-teal-600" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Continuous Lifecycle Audit Event Stream</h3>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-teal-200">
          {auditLogs.map((log) => (
            <div key={log.id} className="relative group">
              
              {/* Dot */}
              <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 w-3.5 h-3.5 rounded-full bg-teal-600 border-2 border-white group-hover:scale-125 transition-transform shadow-xs" />

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {getActionBadge(log.action)}
                    <span className="text-sm font-bold text-slate-800">{log.actor}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-medium">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-medium">{log.details}</p>

                {log.metadata && Object.keys(log.metadata).length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {Object.entries(log.metadata).map(([k, v]) => (
                      <span key={k} className="text-xs font-mono text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                        {k}: <strong className="text-teal-700">{v}</strong>
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
