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
  Layers, 
  Sparkles, 
  Compass, 
  Lock, 
  CreditCard, 
  BarChart3, 
  Sliders
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

  // Device frame sizing classes
  const getDeviceFrameStyles = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-[390px] min-h-[720px] rounded-[40px] border-[8px] border-slate-800 shadow-2xl my-6 mx-auto';
      case 'tablet':
        return 'max-w-[768px] min-h-[700px] rounded-[32px] border-[6px] border-slate-800 shadow-2xl my-6 mx-auto';
      default:
        return 'w-full min-h-[600px] rounded-2xl border border-white/10';
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 relative">
      
      {/* 1. Synthetic Persona Generator Bar */}
      <PersonaSimBar />

      {/* 2. Target App Controls Bar */}
      <div className="border-b border-white/10 bg-slate-900/60 px-4 py-3 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Page Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 overflow-x-auto">
            {pages.map((p) => {
              const isActive = currentPage === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setCurrentPage(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
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
            <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-white/5">
              <button
                onClick={() => setDeviceMode('mobile')}
                title="Mobile View (390px)"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  deviceMode === 'mobile'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
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
                <Tablet className="w-4 h-4" />
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
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            <Badge variant="primary" size="md" dot>
              Live Target App ({currentProdVersion})
            </Badge>
          </div>

        </div>
      </div>

      {/* 3. Main Target App Viewport Area */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col items-center justify-start overflow-y-auto">
        <div className={`relative bg-slate-950/90 transition-all duration-300 ${getDeviceFrameStyles()}`}>
          
          {/* Mobile Speaker / Camera Notch */}
          {deviceMode === 'mobile' && (
            <div className="w-full flex justify-center pt-2 pb-1 pointer-events-none">
              <div className="w-24 h-4 bg-slate-800 rounded-full" />
            </div>
          )}

          {/* Interactive Screen Renderer */}
          <div className="relative min-h-[500px] p-2 sm:p-4">
            {currentPage === 'login' && <LoginPage flags={prodEvolutionFlags} />}
            {currentPage === 'pricing' && <PricingPage flags={prodEvolutionFlags} />}
            {currentPage === 'hero' && <HeroLandingPage flags={prodEvolutionFlags} />}
            {currentPage === 'dashboard' && <DashboardPage flags={prodEvolutionFlags} />}
            {currentPage === 'settings' && <SettingsPage flags={prodEvolutionFlags} />}

            {/* Pin Drop Layer */}
            <PinDropLayer onPinPlaced={handlePinPlaced} />
          </div>
        </div>
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
