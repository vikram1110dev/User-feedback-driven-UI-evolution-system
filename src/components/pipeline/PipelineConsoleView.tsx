import React from 'react';
import { useEvolutionSystem } from '../../context/EvolutionSystemContext';
import { 
  FlaskConical, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  RefreshCw 
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const PipelineConsoleView: React.FC = () => {
  const { 
    pipelineRun, 
    activeProposal, 
    startAutomatedTesting, 
    setActiveView 
  } = useEvolutionSystem();

  const isRunning = pipelineRun?.status === 'running';
  const isSuccess = pipelineRun?.status === 'success';

  const handleRerun = () => {
    if (activeProposal) {
      startAutomatedTesting(activeProposal.id);
    }
  };

  const getTestCategoryBadge = (category: string) => {
    switch (category) {
      case 'build': return <Badge variant="neutral" size="sm">Build & Lint</Badge>;
      case 'a11y': return <Badge variant="purple" size="sm">WCAG a11y</Badge>;
      case 'responsive': return <Badge variant="cyan" size="sm">Responsive Matrix</Badge>;
      case 'regression': return <Badge variant="warning" size="sm">Regression</Badge>;
      default: return <Badge variant="primary" size="sm">Visual Diff Gate</Badge>;
    }
  };

  return (
    <div className="py-6 px-4 max-w-6xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs text-indigo-400 font-bold uppercase">Automated Pipeline</span>
            {isRunning && <Badge variant="cyan" size="sm" dot>Executing Tests...</Badge>}
            {isSuccess && <Badge variant="success" size="sm" dot>All Checks Passed (5/5)</Badge>}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Frontend Testing & Validation Suite
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Validating proposed modifications on isolated staging environment before deployment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={handleRerun}
            disabled={isRunning}
            icon={<RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />}
          >
            Re-run Test Suite
          </Button>

          {isSuccess && (
            <Button
              variant="gradient"
              size="md"
              onClick={() => setActiveView('live-preview-split')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Live Preview
            </Button>
          )}
        </div>
      </div>

      {/* Grid: Test Checklist (Left) & Live Console Terminal (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Test Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Automated Quality Gates
            </h3>
            <span className="text-xs text-slate-500">
              {pipelineRun?.testCases.filter(t => t.status === 'passed').length || 0} / {pipelineRun?.testCases.length || 5} Passed
            </span>
          </div>

          {pipelineRun?.testCases.map((tc, idx) => (
            <div
              key={tc.id}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                tc.status === 'passed'
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : tc.status === 'running'
                  ? 'bg-cyan-950/20 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : 'glass-card border-white/5 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    {tc.status === 'passed' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {tc.status === 'running' && (
                      <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    )}
                    {tc.status === 'idle' && <Clock className="w-5 h-5 text-slate-600" />}
                    {tc.status === 'failed' && <XCircle className="w-5 h-5 text-rose-400" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white">{tc.name}</span>
                      {getTestCategoryBadge(tc.category)}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{tc.description}</p>
                    
                    {tc.details && tc.status === 'passed' && (
                      <p className="mt-2 text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        ✓ {tc.details} {tc.durationMs && `(${tc.durationMs}ms)`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Console Terminal Logs (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-white/10 bg-slate-950 overflow-hidden shadow-2xl">
            <div className="px-4 py-3 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold font-mono text-slate-300">pipeline-runner.log</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="p-4 font-mono text-[11px] text-slate-300 max-h-[440px] overflow-y-auto space-y-1.5 leading-relaxed bg-slate-950/90">
              {pipelineRun?.logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.includes('FAIL')
                      ? 'text-rose-400'
                      : log.includes('PASS') || log.includes('SUCCESS')
                      ? 'text-emerald-400 font-semibold'
                      : log.includes('EXEC')
                      ? 'text-cyan-300'
                      : 'text-slate-400'
                  }`}
                >
                  {log}
                </div>
              ))}
              {isRunning && (
                <div className="flex items-center gap-2 text-cyan-400 animate-pulse pt-2">
                  <span>▶ Streaming pipeline output...</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
