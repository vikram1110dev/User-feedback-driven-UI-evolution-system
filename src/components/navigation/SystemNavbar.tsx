import React from 'react';
import { useEvolutionSystem, ActiveAppView } from '../../context/EvolutionSystemContext';
import { 
  Sparkles, 
  ShieldCheck, 
  FlaskConical, 
  SplitSquareVertical, 
  History, 
  Layout, 
  ExternalLink,
  GitBranch
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const SystemNavbar: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    proposals, 
    currentProdVersion,
    pipelineRun
  } = useEvolutionSystem();

  const pendingCount = proposals.filter(p => p.status === 'pending-admin-review').length;
  const isPipelineRunning = pipelineRun?.status === 'running';

  const navItems: { id: ActiveAppView; label: string; shortLabel: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
    {
      id: 'target-app',
      label: 'Live Target App',
      shortLabel: 'Target App',
      icon: <Layout className="w-3.5 h-3.5" />,
    },
    {
      id: 'admin-studio',
      label: 'Admin Studio',
      shortLabel: 'Admin HITL',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      badge: pendingCount > 0 ? (
        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-rose-500 text-white animate-pulse">
          {pendingCount}
        </span>
      ) : undefined,
    },
    {
      id: 'pipeline-console',
      label: 'Test Pipeline',
      shortLabel: 'Pipeline',
      icon: <FlaskConical className={`w-3.5 h-3.5 ${isPipelineRunning ? 'animate-spin text-cyan-400' : ''}`} />,
      badge: isPipelineRunning ? (
        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          Running
        </span>
      ) : undefined,
    },
    {
      id: 'live-preview-split',
      label: 'Split Preview',
      shortLabel: 'Preview',
      icon: <SplitSquareVertical className="w-3.5 h-3.5" />,
    },
    {
      id: 'audit-traceability',
      label: 'Version Audit',
      shortLabel: 'Audit',
      icon: <History className="w-3.5 h-3.5" />,
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#090d16]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 p-px shadow-md shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#080b11] rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-tight text-white">
                Evolv<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">UI</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {currentProdVersion} Live
              </span>
            </div>
          </div>
        </div>

        {/* Center Nav Segmented Control */}
        <nav className="flex items-center gap-0.5 p-1 bg-slate-900/80 rounded-xl border border-white/[0.08] backdrop-blur-md overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
                <span className="inline sm:hidden">{item.shortLabel}</span>
                {item.badge}
              </button>
            );
          })}
        </nav>

        {/* Right Status / Repo Link */}
        <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-white/5 text-[11px] text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>HITL Enforced</span>
          </div>

          <a
            href="https://github.com/vikram1110dev/User-feedback-driven-UI-evolution-system"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="View on GitHub"
          >
            <GitBranch className="w-4 h-4" />
          </a>
        </div>

      </div>
    </header>
  );
};
