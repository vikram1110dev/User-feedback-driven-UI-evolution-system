import React, { useState } from 'react';
import { useEvolutionSystem, TargetAppPage } from '../../context/EvolutionSystemContext';
import confetti from 'canvas-confetti';
import { LoginPage } from '../target-app/pages/LoginPage';
import { PricingPage } from '../target-app/pages/PricingPage';
import { HeroLandingPage } from '../target-app/pages/HeroLandingPage';
import { DashboardPage } from '../target-app/pages/DashboardPage';
import { SettingsPage } from '../target-app/pages/SettingsPage';

import { 
  Smartphone, 
  Tablet, 
  Monitor, 
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
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#14b8a6', '#10b981', '#f59e0b', '#06b6d4'],
      });

      setTimeout(() => {
        setActiveView('target-app');
      }, 1800);
    } finally {
      setIsDeploying(false);
    }
  };

  const pages: { id: TargetAppPage; label: string; icon: React.ReactNode }[] = [
    { id: 'login', label: 'Login Screen', icon: <Lock className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing Matrix', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'hero', label: 'Hero Landing', icon: <Compass className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Telemetry Hub', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Sliders className="w-4 h-4" /> },
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
        return 'w-full max-w-[380px] min-h-[660px] rounded-[40px] border-[10px] border-slate-800 bg-white shadow-2xl mx-auto';
      case 'tablet':
        return 'w-full max-w-[660px] min-h-[640px] rounded-[32px] border-[8px] border-slate-800 bg-white shadow-2xl mx-auto';
      default:
        return 'w-full min-h-[580px] rounded-3xl border border-slate-200 bg-white';
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Top Header & Deployment Controls */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <Badge variant="teal" size="md" dot>Live Split Preview</Badge>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">Production ({currentProdVersion}) vs Staging (Approved Changes)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Visual Verification & Deployment Gate
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
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
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Page Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setCurrentPage(p.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                currentPage === p.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {p.icon}
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-700">Viewport:</span>
          <div className="flex items-center gap-1 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-2 rounded-xl text-xs cursor-pointer ${deviceMode === 'mobile' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white'}`}
              title="Mobile (380px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-2 rounded-xl text-xs cursor-pointer ${deviceMode === 'tablet' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white'}`}
              title="Tablet (660px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-2 rounded-xl text-xs cursor-pointer ${deviceMode === 'desktop' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white'}`}
              title="Desktop (Full Width)"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Split Comparison Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left: Baseline / Production */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-slate-400" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">
                Current Production ({currentProdVersion})
              </h3>
            </div>
            <Badge variant="neutral" size="sm">Baseline State</Badge>
          </div>

          <div className="bg-slate-100 p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex justify-center">
            <div className={`${getDeviceFrameStyles()} p-4 sm:p-6`}>
              {renderScreen(prodEvolutionFlags, false)}
            </div>
          </div>
        </div>

        {/* Right: Evolved / Staging Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-teal-600 animate-pulse" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-teal-800">
                Staging Preview (Evolved AI Changes)
              </h3>
            </div>
            <Badge variant="success" size="sm" dot>Validated (5/5 Tests)</Badge>
          </div>

          <div className="bg-slate-100 p-4 sm:p-6 rounded-3xl border-2 border-teal-500 shadow-lg shadow-teal-500/10 overflow-hidden flex justify-center">
            <div className={`${getDeviceFrameStyles()} p-4 sm:p-6`}>
              {renderScreen(stagingEvolutionFlags, true)}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
