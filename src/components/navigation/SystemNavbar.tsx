import React from 'react';
import { useEvolutionSystem, ActiveAppView } from '../../context/EvolutionSystemContext';
import { 
  Sparkles, 
  ShieldCheck, 
  FlaskConical, 
  SplitSquareVertical, 
  History, 
  Layout, 
  Layers
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

  const navItems: { id: ActiveAppView; label: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
    {
      id: 'target-app',
      label: 'Live Target App',
      icon: <Layout className="w-4 h-4" />,
    },
    {
      id: 'admin-studio',
      label: 'Admin Studio (HITL)',
      icon: <ShieldCheck className="w-4 h-4" />,
      badge: pendingCount > 0 ? (
        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white animate-pulse">
          {pendingCount}
        </span>
      ) : undefined,
    },
    {
      id: 'pipeline-console',
      label: 'Automated Pipeline',
      icon: <FlaskConical className={`w-4 h-4 ${isPipelineRunning ? 'animate-spin text-cyan-400' : ''}`} />,
      badge: isPipelineRunning ? (
        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          Running
        </span>
      ) : undefined,
    },
    {
      id: 'live-preview-split',
      label: 'Live Split Preview',
      icon: <SplitSquareVertical className="w-4 h-4" />,
    },
    {
      id: 'audit-traceability',
      label: 'Audit & Version History',
      icon: <History className="w-4 h-4" />,
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg tracking-tight text-white">
                Evolv<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">UI</span>
              </span>
              <Badge variant="primary" size="sm" dot>
                {currentProdVersion} Live
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">User Feedback Driven UI Evolution System</p>
          </div>
        </div>

        {/* Center View Navigation Tabs */}
        <nav className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-2xl border border-white/10 backdrop-blur-lg overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge}
              </button>
            );
          })}
        </nav>

        {/* Right Status Indicator */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>HITL Governance Active</span>
          </div>
        </div>

      </div>
    </header>
  );
};
