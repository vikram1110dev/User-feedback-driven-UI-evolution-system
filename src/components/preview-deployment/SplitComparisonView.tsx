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
  Sliders,
  Columns,
  Layers,
  ZoomIn,
  ArrowLeftRight
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
  const [viewMode, setViewMode] = useState<'split' | 'wipe'>('split');
  const [wipePosition, setWipePosition] = useState<number>(50); // percentage 0-100
  const [zoomScale, setZoomScale] = useState<number>(100); // 100%, 90%, 80%

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
            <Badge variant="teal" size="md" dot>Live Visual Verification Gate</Badge>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">
              Production ({currentProdVersion}) vs Staging (Approved Evolution)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Split Comparison & A/B Wipe Inspector
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Inspect responsive layout changes, WCAG color improvements, and deploy with zero downtime.
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

        {/* View Mode & Device Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Comparison Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'split' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Side-by-Side Split View"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
            <button
              onClick={() => setViewMode('wipe')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'wipe' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Interactive A/B Wipe Divider Slider"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>A/B Wipe Slider</span>
            </button>
          </div>

          {/* Zoom scale */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs">
            <span className="px-2 text-slate-500 font-bold flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" />
            </span>
            {[100, 90, 80].map((scale) => (
              <button
                key={scale}
                onClick={() => setZoomScale(scale)}
                className={`px-2.5 py-1 rounded-xl font-bold cursor-pointer ${
                  zoomScale === scale ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {scale}%
              </button>
            ))}
          </div>

          {/* Device Switcher */}
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

      {/* Main View Container */}
      <div style={{ transform: `scale(${zoomScale / 100})`, transformOrigin: 'top center' }} className="transition-transform duration-200">
        
        {viewMode === 'split' ? (
          /* Mode A: Side-by-Side 2 Column Split */
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
        ) : (
          /* Mode B: Interactive A/B Wipe Overlay Slider */
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6 text-white">
            
            {/* Slider Header Control */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Interactive A/B Wipe Slider</h3>
                  <p className="text-xs text-slate-400">Drag divider to reveal Production vs Staging pixel-perfect overlay</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
                <span className="text-xs font-bold text-slate-400">Production {100 - wipePosition}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={wipePosition}
                  onChange={(e) => setWipePosition(Number(e.target.value))}
                  className="w-36 accent-teal-500 cursor-ew-resize"
                />
                <span className="text-xs font-bold text-teal-400">Staging {wipePosition}%</span>
              </div>
            </div>

            {/* Wipe Viewport */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex justify-center p-4">
              <div className={`${getDeviceFrameStyles()} relative overflow-hidden select-none`}>
                
                {/* Layer 1: Baseline Production (Always in background) */}
                <div className="w-full h-full p-4 sm:p-6 bg-white">
                  {renderScreen(prodEvolutionFlags, false)}
                </div>

                {/* Layer 2: Evolved Staging (Clipped by wipe slider) */}
                <div 
                  className="absolute inset-0 p-4 sm:p-6 bg-white transition-none overflow-hidden"
                  style={{
                    clipPath: `polygon(${wipePosition}% 0, 100% 0, 100% 100%, ${wipePosition}% 100%)`
                  }}
                >
                  {renderScreen(stagingEvolutionFlags, true)}
                </div>

                {/* Vertical Divider Handle Line */}
                <div
                  className="absolute top-0 bottom-0 z-20 pointer-events-none flex flex-col items-center justify-center"
                  style={{ left: `${wipePosition}%` }}
                >
                  <div className="w-0.5 h-full bg-teal-500 shadow-md shadow-teal-500/50" />
                  <div className="absolute w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg border-2 border-white text-xs font-bold">
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Floating Tags */}
                <div className="absolute top-3 left-3 z-30 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-white font-mono text-[10px] font-bold border border-slate-700">
                    ← Prod ({currentProdVersion})
                  </span>
                </div>
                <div className="absolute top-3 right-3 z-30 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-900/90 text-teal-200 font-mono text-[10px] font-bold border border-teal-700">
                    Staging Evolved →
                  </span>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
