import React, { useState } from 'react';
import { useEvolutionSystem, TargetAppPage } from '../../context/EvolutionSystemContext';
import confetti from 'canvas-confetti';
import { LoginPage } from '../target-app/pages/LoginPage';
import { PricingPage } from '../target-app/pages/PricingPage';
import { HeroLandingPage } from '../target-app/pages/HeroLandingPage';
import { DashboardPage } from '../target-app/pages/DashboardPage';
import { SettingsPage } from '../target-app/pages/SettingsPage';

import { 
  SplitSquareVertical, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Sparkles, 
  Rocket, 
  Lock, 
  CreditCard, 
  Compass, 
  BarChart3,
  Sliders
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const SplitComparisonView: React.FC = () => {
  const { 
    activeProposal, 
    prodEvolutionFlags, 
    stagingEvolutionFlags, 
    currentPage, 
    setCurrentPage, 
    deviceMode, 
    setDeviceMode,
    currentProdVersion,
    deployProposalToProd,
    setActiveView
  } = useEvolutionSystem();

  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = async () => {
    if (!activeProposal) return;
    setIsDeploying(true);
    try {
      await deployProposalToProd(activeProposal.id);

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
      });

      setTimeout(() => {
        setActiveView('target-app');
      }, 1800);
    } finally {
      setIsDeploying(false);
    }
  };

  const pages: { id: TargetAppPage; label: string; icon: React.ReactNode }[] = [
    { id: 'login', label: 'Login Screen', icon: <Lock className="w-3.5 h-3.5" /> },
    { id: 'pricing', label: 'Pricing Matrix', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'hero', label: 'Hero Landing', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'dashboard', label: 'Telemetry Hub', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'settings', label: 'Settings', icon: <Sliders className="w-3.5 h-3.5" /> },
  ];

  const renderScreen = (flags: typeof prodEvolutionFlags, isStaging: boolean) => {
    switch (currentPage) {
      case 'login': return <LoginPage flags={flags} isStagingPreview={isStaging} />;
      case 'pricing': return <PricingPage flags={flags} isStagingPreview={isStaging} />;
      case 'hero': return <HeroLandingPage flags={flags} isStagingPreview={isStaging} />;
      case 'dashboard': return <DashboardPage flags={flags} isStagingPreview={isStaging} />;
      case 'settings': return <SettingsPage flags={flags} isStagingPreview={isStaging} />;
      default: return <LoginPage flags={flags} isStagingPreview={isStaging} />;
    }
  };

  const getDeviceFrameStyles = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-full max-w-[360px] min-h-[640px] rounded-[32px] border-4 border-slate-800 shadow-2xl mx-auto';
      case 'tablet':
        return 'w-full max-w-[620px] min-h-[600px] rounded-[24px] border-4 border-slate-800 shadow-2xl mx-auto';
      default:
        return 'w-full min-h-[550px] rounded-2xl border border-white/10';
    }
  };

  return (
    <div className="py-6 px-3 sm:px-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      
      {/* Top Header & Deployment Controls */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="cyan" size="sm" dot>Live Split Preview</Badge>
            <span className="text-xs text-slate-400">Production ({currentProdVersion}) vs Staging (Approved Changes)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
            Visual Verification & Deployment Gate
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Verify layout rendering before rolling out approved modifications to live production users.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="gradient"
            size="lg"
            loading={isDeploying}
            onClick={handleDeploy}
            icon={<Rocket className="w-5 h-5" />}
          >
            Deploy Approved UI to Production
          </Button>
        </div>
      </div>

      {/* Viewport and Screen Controls Bar */}
      <div className="glass-card p-3 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3">
        
        {/* Page Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-white/5 overflow-x-auto">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setCurrentPage(p.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                currentPage === p.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {p.icon}
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Viewport:</span>
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-white/5">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-lg text-xs ${deviceMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Mobile (360px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-lg text-xs ${deviceMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Tablet (620px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-lg text-xs ${deviceMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Desktop (Full)"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Split Comparison Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Left: Baseline / Production */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Current Production ({currentProdVersion})
              </h3>
            </div>
            <Badge variant="neutral" size="sm">Baseline</Badge>
          </div>

          <div className="bg-slate-950 p-3 sm:p-4 rounded-3xl border border-white/10 overflow-hidden flex justify-center">
            <div className={`${getDeviceFrameStyles()} bg-slate-950/90 p-2 sm:p-3`}>
              {renderScreen(prodEvolutionFlags, false)}
            </div>
          </div>
        </div>

        {/* Right: Evolved / Staging Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Staging Preview (Evolved AI Changes)
              </h3>
            </div>
            <Badge variant="success" size="sm" dot>Validated (5/5 Tests)</Badge>
          </div>

          <div className="bg-slate-950 p-3 sm:p-4 rounded-3xl border border-indigo-500/40 shadow-2xl shadow-indigo-500/10 overflow-hidden flex justify-center">
            <div className={`${getDeviceFrameStyles()} bg-slate-950/90 p-2 sm:p-3`}>
              {renderScreen(stagingEvolutionFlags, true)}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
