import React from 'react';
import { useEvolutionSystem, ActiveAppView } from '../../context/EvolutionSystemContext';
import { 
  Sparkles, 
  ShieldCheck, 
  FlaskConical, 
  SplitSquareVertical, 
  History, 
  Layout, 
  GitBranch
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const SystemNavbar: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    proposals, 
    currentProdVersion,
    pipelineRun,
    geminiApiKey,
    selectedModel,
    setCurrentPage
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
        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white animate-pulse">
          {pendingCount}
        </span>
      ) : undefined,
    },
    {
      id: 'pipeline-console',
      label: 'Test Pipeline',
      icon: <FlaskConical className={`w-4 h-4 ${isPipelineRunning ? 'animate-spin text-teal-600' : ''}`} />,
      badge: isPipelineRunning ? (
        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-teal-100 text-teal-800 border border-teal-300">
          Running
        </span>
      ) : undefined,
    },
    {
      id: 'live-preview-split',
      label: 'Split Preview',
      icon: <SplitSquareVertical className="w-4 h-4" />,
    },
    {
      id: 'audit-traceability',
      label: 'Version Audit',
      icon: <History className="w-4 h-4" />,
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 p-0.5 shadow-md shadow-teal-600/25 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-teal-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900">
                Evolv<span className="text-teal-600">UI</span>
              </span>
              <Badge variant="teal" size="sm" dot>
                {currentProdVersion} Live
              </Badge>
            </div>
            <p className="text-xs text-slate-500 hidden lg:block font-medium">User Feedback Driven UI Evolution System</p>
          </div>
        </div>

        {/* Center Nav Segmented Control */}
        <nav className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge}
              </button>
            );
          })}
        </nav>

        {/* Right Status / AI Status / Repo Link */}
        <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={() => {
              setCurrentPage('settings');
              setActiveView('target-app');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
            title="Configure Gemini AI Engine & Models"
          >
            {geminiApiKey && geminiApiKey.trim().length > 0 ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-teal-900 font-bold">{selectedModel}</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="text-slate-700 font-medium">Autonomous Sim AI</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>HITL Enforced</span>
          </div>

          <a
            href="https://github.com/vikram1110dev/User-feedback-driven-UI-evolution-system"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            title="View on GitHub"
          >
            <GitBranch className="w-4 h-4" />
          </a>
        </div>

      </div>
    </header>
  );
};

