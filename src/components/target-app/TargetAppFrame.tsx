import React, { useState } from 'react';
import { useEvolutionSystem, TargetAppPage } from '../../context/EvolutionSystemContext';
import { PersonaSimBar } from './feedback-widget/PersonaSimBar';
import { ElementHighlighterOverlay } from './feedback-widget/ElementHighlighterOverlay';
import { PinDropLayer } from './feedback-widget/PinDropLayer';
import { FeedbackFabTrigger } from './feedback-widget/FeedbackFabTrigger';
import { FeedbackSubmissionModal } from './feedback-widget/FeedbackSubmissionModal';
import { PinLocation } from '../../types/feedback';

import { LoginPage } from './pages/LoginPage';
import { PricingPage } from './pages/PricingPage';
import { HeroLandingPage } from './pages/HeroLandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';

import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Lock, 
  CreditCard, 
  Compass, 
  BarChart3, 
  Sliders,
  Globe,
  Wifi,
  BatteryMedium
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const TargetAppFrame: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    deviceMode, 
    setDeviceMode,
    prodEvolutionFlags,
    currentProdVersion,
    setSelectedElementSelector,
    setCurrentPinLocation,
    setIsPinDropModeActive,
  } = useEvolutionSystem();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSelector, setActiveSelector] = useState<string | null>(null);

  const handleElementSelected = (selector: string) => {
    setActiveSelector(selector);
    setSelectedElementSelector(selector);
    setIsModalOpen(true);
  };

  const handlePinPlaced = (location: PinLocation) => {
    setCurrentPinLocation(location);
    setIsPinDropModeActive(false);
    setIsModalOpen(true);
  };

  const pages: { id: TargetAppPage; label: string; icon: React.ReactNode }[] = [
    { id: 'login', label: 'Login Screen', icon: <Lock className="w-3.5 h-3.5" /> },
    { id: 'pricing', label: 'Pricing Matrix', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'hero', label: 'Hero Landing', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'dashboard', label: 'Telemetry Hub', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'settings', label: 'Settings', icon: <Sliders className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-3.5rem)] bg-[#080b11] text-slate-100 relative">
      
      {/* 1. Synthetic Persona Generator Bar */}
      <PersonaSimBar />

      {/* 2. Target App Controls Bar */}
      <div className="border-b border-white/[0.08] bg-[#0c101a]/80 px-4 py-2.5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Page Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/90 rounded-xl border border-white/[0.06] overflow-x-auto">
            {pages.map((p) => {
              const isActive = currentPage === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setCurrentPage(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {p.icon}
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Device Viewport Switcher & Prod Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-950/90 rounded-xl border border-white/[0.06]">
              <button
                onClick={() => setDeviceMode('mobile')}
                title="Mobile View (390px)"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  deviceMode === 'mobile'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                title="Tablet View (768px)"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  deviceMode === 'tablet'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode('desktop')}
                title="Desktop View (Full Width)"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  deviceMode === 'desktop'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Target Runtime: {currentProdVersion}
            </span>
          </div>

        </div>
      </div>

      {/* 3. Main Viewport Area with Simulated Device Frames */}
      <div className="flex-1 p-3 sm:p-6 flex flex-col items-center justify-start overflow-y-auto">
        
        {deviceMode === 'mobile' && (
          <div className="w-full max-w-[390px] rounded-[44px] border-[10px] border-slate-800 bg-[#090d16] shadow-2xl overflow-hidden my-4 relative">
            {/* Phone Status Bar */}
            <div className="px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-400 select-none">
              <span>9:41</span>
              <div className="w-20 h-4 bg-slate-800 rounded-full" />
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3 text-slate-400" />
                <BatteryMedium className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="p-3 min-h-[640px] relative">
              {currentPage === 'login' && <LoginPage flags={prodEvolutionFlags} />}
              {currentPage === 'pricing' && <PricingPage flags={prodEvolutionFlags} />}
              {currentPage === 'hero' && <HeroLandingPage flags={prodEvolutionFlags} />}
              {currentPage === 'dashboard' && <DashboardPage flags={prodEvolutionFlags} />}
              {currentPage === 'settings' && <SettingsPage flags={prodEvolutionFlags} />}

              {/* Pin Layer */}
              <PinDropLayer onPinPlaced={handlePinPlaced} />
            </div>

            {/* Bottom Home Indicator */}
            <div className="w-full flex justify-center pb-2 pt-1">
              <div className="w-32 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>
        )}

        {deviceMode === 'tablet' && (
          <div className="w-full max-w-[768px] rounded-[36px] border-[8px] border-slate-800 bg-[#090d16] shadow-2xl overflow-hidden my-4 relative">
            <div className="p-4 min-h-[650px] relative">
              {currentPage === 'login' && <LoginPage flags={prodEvolutionFlags} />}
              {currentPage === 'pricing' && <PricingPage flags={prodEvolutionFlags} />}
              {currentPage === 'hero' && <HeroLandingPage flags={prodEvolutionFlags} />}
              {currentPage === 'dashboard' && <DashboardPage flags={prodEvolutionFlags} />}
              {currentPage === 'settings' && <SettingsPage flags={prodEvolutionFlags} />}

              {/* Pin Layer */}
              <PinDropLayer onPinPlaced={handlePinPlaced} />
            </div>
          </div>
        )}

        {deviceMode === 'desktop' && (
          <div className="w-full max-w-6xl rounded-2xl border border-white/[0.08] bg-[#090d16] shadow-2xl overflow-hidden">
            {/* Desktop Browser Bar */}
            <div className="px-4 py-2 bg-slate-900/90 border-b border-white/[0.06] flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/80 border border-white/5 text-[11px] text-slate-400 font-mono flex-1 max-w-md mx-auto">
                <Globe className="w-3 h-3 text-slate-500" />
                <span>https://app.evolvui.internal/{currentPage}</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Screen Content */}
            <div className="p-4 sm:p-6 min-h-[550px] relative">
              {currentPage === 'login' && <LoginPage flags={prodEvolutionFlags} />}
              {currentPage === 'pricing' && <PricingPage flags={prodEvolutionFlags} />}
              {currentPage === 'hero' && <HeroLandingPage flags={prodEvolutionFlags} />}
              {currentPage === 'dashboard' && <DashboardPage flags={prodEvolutionFlags} />}
              {currentPage === 'settings' && <SettingsPage flags={prodEvolutionFlags} />}

              {/* Pin Layer */}
              <PinDropLayer onPinPlaced={handlePinPlaced} />
            </div>
          </div>
        )}

      </div>

      {/* 4. Feedback Overlays & FAB */}
      <ElementHighlighterOverlay onElementSelected={handleElementSelected} />
      <FeedbackFabTrigger onOpenModal={() => setIsModalOpen(true)} />
      <FeedbackSubmissionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveSelector(null);
        }}
        selectedSelector={activeSelector}
      />

    </div>
  );
};
