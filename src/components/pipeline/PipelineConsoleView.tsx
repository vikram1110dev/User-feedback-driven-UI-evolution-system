import React from 'react';
import { useEvolutionSystem } from '../../context/EvolutionSystemContext';
import { 
  FlaskConical, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Terminal, 
  ArrowRight, 
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
      case 'a11y': return <Badge variant="teal" size="sm">WCAG a11y</Badge>;
      case 'responsive': return <Badge variant="cyan" size="sm">Responsive Matrix</Badge>;
      case 'regression': return <Badge variant="warning" size="sm">Regression</Badge>;
      default: return <Badge variant="purple" size="sm">Visual Diff Gate</Badge>;
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="font-mono text-xs text-teal-800 font-extrabold uppercase bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-200">
              Automated Pipeline
            </span>
            {isRunning && <Badge variant="teal" size="md" dot>Executing Tests...</Badge>}
            {isSuccess && <Badge variant="success" size="md" dot>All Checks Passed (5/5)</Badge>}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Frontend Testing & Validation Suite
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 font-medium">
            Validating proposed modifications on isolated staging environment before deployment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={handleRerun}
            disabled={isRunning}
            icon={<RefreshCw className={`w-5 h-5 ${isRunning ? 'animate-spin' : ''}`} />}
          >
            Re-run Test Suite
          </Button>

          {isSuccess && (
            <Button
              variant="gradient"
              size="md"
              onClick={() => setActiveView('live-preview-split')}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Proceed to Live Preview
            </Button>
          )}
        </div>
      </div>

      {/* Grid: Test Checklist (Left) & Console Terminal (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Test Checklist (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Automated Quality Gates
            </h3>
            <span className="text-xs font-bold text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
              {pipelineRun?.testCases.filter(t => t.status === 'passed').length || 0} / {pipelineRun?.testCases.length || 5} Passed
            </span>
          </div>

          {pipelineRun?.testCases.map((tc) => (
            <div
              key={tc.id}
              className={`p-5 rounded-3xl border transition-all duration-300 shadow-xs ${
                tc.status === 'passed'
                  ? 'bg-emerald-50/80 border-emerald-300'
                  : tc.status === 'running'
                  ? 'bg-teal-50 border-2 border-teal-500 shadow-md shadow-teal-500/10'
                  : 'bg-white border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="mt-1 flex-shrink-0">
                    {tc.status === 'passed' && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                    {tc.status === 'running' && (
                      <div className="w-6 h-6 border-3 border-teal-600 border-t-transparent rounded-full animate-spin" />
                    )}
                    {tc.status === 'idle' && <Clock className="w-6 h-6 text-slate-300" />}
                    {tc.status === 'failed' && <XCircle className="w-6 h-6 text-rose-600" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-sm sm:text-base font-bold text-slate-900">{tc.name}</span>
                      {getTestCategoryBadge(tc.category)}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{tc.description}</p>
                    
                    {tc.details && tc.status === 'passed' && (
                      <p className="mt-2.5 text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
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
          <div className="rounded-3xl border border-slate-300 bg-slate-950 overflow-hidden shadow-xl text-white">
            <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold font-mono text-slate-300">pipeline-runner.log</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="p-5 font-mono text-xs text-slate-300 max-h-[480px] overflow-y-auto space-y-2 leading-relaxed bg-slate-950">
              {pipelineRun?.logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.includes('FAIL')
                      ? 'text-rose-400 font-bold'
                      : log.includes('PASS') || log.includes('SUCCESS')
                      ? 'text-emerald-400 font-bold'
                      : log.includes('EXEC')
                      ? 'text-teal-300'
                      : 'text-slate-400'
                  }`}
                >
                  {log}
                </div>
              ))}
              {isRunning && (
                <div className="flex items-center gap-2 text-teal-400 animate-pulse pt-2 font-bold">
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
