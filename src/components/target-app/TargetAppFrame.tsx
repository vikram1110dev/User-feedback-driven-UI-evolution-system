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
    { id: 'login', label: 'Login Screen', icon: <Lock className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing Matrix', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'hero', label: 'Hero Landing', icon: <Compass className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Telemetry Hub', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Sliders className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 relative">
      
      {/* 1. Synthetic Persona Generator Bar */}
      <PersonaSimBar />

      {/* 2. Target App Controls Bar */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Page Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto">
            {pages.map((p) => {
              const isActive = currentPage === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setCurrentPage(p.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
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
            <div className="flex items-center gap-1 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                onClick={() => setDeviceMode('mobile')}
                title="Mobile View (390px)"
                className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                  deviceMode === 'mobile'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                title="Tablet View (768px)"
                className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                  deviceMode === 'tablet'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceMode('desktop')}
                title="Desktop View (Full Width)"
                className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                  deviceMode === 'desktop'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            <Badge variant="teal" size="md" dot>
              Live Target App ({currentProdVersion})
            </Badge>
          </div>

        </div>
      </div>

      {/* 3. Main Viewport Area with Simulated Device Frames */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col items-center justify-start overflow-y-auto">
        
        {deviceMode === 'mobile' && (
          <div className="w-full max-w-[400px] rounded-[48px] border-[12px] border-slate-800 bg-white shadow-2xl overflow-hidden my-4 relative">
            {/* Phone Status Bar */}
            <div className="px-6 pt-3 pb-2 flex items-center justify-between text-xs font-bold text-slate-700 select-none bg-slate-100 border-b border-slate-200">
              <span>9:41</span>
              <div className="w-24 h-4 bg-slate-800 rounded-full" />
              <div className="flex items-center gap-1.5 text-slate-700">
                <Wifi className="w-3.5 h-3.5" />
                <BatteryMedium className="w-4 h-4" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="p-4 min-h-[660px] relative bg-white">
              {currentPage === 'login' && <LoginPage flags={prodEvolutionFlags} />}
              {currentPage === 'pricing' && <PricingPage flags={prodEvolutionFlags} />}
              {currentPage === 'hero' && <HeroLandingPage flags={prodEvolutionFlags} />}
              {currentPage === 'dashboard' && <DashboardPage flags={prodEvolutionFlags} />}
              {currentPage === 'settings' && <SettingsPage flags={prodEvolutionFlags} />}

              {/* Pin Layer */}
              <PinDropLayer onPinPlaced={handlePinPlaced} />
            </div>

            {/* Bottom Home Indicator */}
            <div className="w-full flex justify-center pb-2.5 pt-1 bg-white">
              <div className="w-36 h-1 bg-slate-400 rounded-full" />
            </div>
          </div>
        )}

        {deviceMode === 'tablet' && (
          <div className="w-full max-w-[780px] rounded-[40px] border-[10px] border-slate-800 bg-white shadow-2xl overflow-hidden my-4 relative">
            <div className="p-6 min-h-[680px] relative bg-white">
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
          <div className="w-full max-w-6xl rounded-3xl border border-slate-300 bg-white shadow-xl overflow-hidden">
            {/* Desktop Browser Bar */}
            <div className="px-5 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 font-mono flex-1 max-w-md mx-auto shadow-2xs">
                <Globe className="w-4 h-4 text-teal-600" />
                <span className="font-medium">https://app.evolvui.internal/{currentPage}</span>
              </div>
              <div className="w-16" />
            </div>

            {/* Screen Content */}
            <div className="p-6 sm:p-8 min-h-[580px] relative bg-slate-50/50">
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
