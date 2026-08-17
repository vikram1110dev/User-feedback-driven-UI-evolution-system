import React, { useState } from 'react';
import { useEvolutionSystem } from '../../../context/EvolutionSystemContext';
import { MessageSquarePlus, MousePointer, MapPin, Sparkles, X, ChevronUp } from 'lucide-react';

interface FeedbackFabTriggerProps {
  onOpenModal: () => void;
}

export const FeedbackFabTrigger: React.FC<FeedbackFabTriggerProps> = ({ onOpenModal }) => {
  const { 
    setIsFeedbackModeActive, 
    setIsPinDropModeActive,
    isFeedbackModeActive,
    isPinDropModeActive
  } = useEvolutionSystem();

  const [isOpen, setIsOpen] = useState(false);

  const handleInspectElement = () => {
    setIsFeedbackModeActive(true);
    setIsPinDropModeActive(false);
    setIsOpen(false);
  };

  const handleDropPin = () => {
    setIsPinDropModeActive(true);
    setIsFeedbackModeActive(false);
    setIsOpen(false);
  };

  const handleOpenForm = () => {
    onOpenModal();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      
      {/* Expanded Menu Actions */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2 animate-slide-up mb-2">
          
          {/* Action 1: Select UI Element */}
          <button
            onClick={handleInspectElement}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-indigo-600/30 text-slate-200 hover:text-white border border-white/10 hover:border-indigo-500/50 shadow-xl backdrop-blur-xl transition-all group"
          >
            <span className="text-xs font-semibold">Inspect UI Component</span>
            <div className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
              <MousePointer className="w-4 h-4" />
            </div>
          </button>

          {/* Action 2: Drop Pin */}
          <button
            onClick={handleDropPin}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-rose-600/30 text-slate-200 hover:text-white border border-white/10 hover:border-rose-500/50 shadow-xl backdrop-blur-xl transition-all group"
          >
            <span className="text-xs font-semibold">Drop Viewport Pin</span>
            <div className="p-1.5 rounded-xl bg-rose-500/20 text-rose-400 group-hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>
          </button>

          {/* Action 3: General Feedback */}
          <button
            onClick={handleOpenForm}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-emerald-600/30 text-slate-200 hover:text-white border border-white/10 hover:border-emerald-500/50 shadow-xl backdrop-blur-xl transition-all group"
          >
            <span className="text-xs font-semibold">Quick Feedback Form</span>
            <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
              <MessageSquarePlus className="w-4 h-4" />
            </div>
          </button>

        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-semibold text-sm shadow-2xl shadow-indigo-500/40 border border-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Report UI / Suggest Improvement</span>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronUp className="w-4 h-4" />
        </div>
      </button>

    </div>
  );
};
