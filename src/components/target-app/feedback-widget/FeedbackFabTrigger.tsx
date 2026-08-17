import React, { useState } from 'react';
import { useEvolutionSystem } from '../../../context/EvolutionSystemContext';
import { MessageSquarePlus, MousePointer, MapPin, Sparkles, ChevronUp } from 'lucide-react';

interface FeedbackFabTriggerProps {
  onOpenModal: () => void;
}

export const FeedbackFabTrigger: React.FC<FeedbackFabTriggerProps> = ({ onOpenModal }) => {
  const { 
    setIsFeedbackModeActive, 
    setIsPinDropModeActive,
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
        <div className="flex flex-col items-end gap-2.5 animate-slide-up mb-2">
          
          {/* Action 1: Select UI Element */}
          <button
            onClick={handleInspectElement}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white hover:bg-teal-50 text-slate-800 hover:text-teal-900 border border-slate-300 hover:border-teal-400 shadow-xl transition-all group cursor-pointer"
          >
            <span className="text-sm font-bold">Inspect UI Component</span>
            <div className="p-2 rounded-xl bg-teal-100 text-teal-700 group-hover:scale-110 transition-transform">
              <MousePointer className="w-4 h-4" />
            </div>
          </button>

          {/* Action 2: Drop Pin */}
          <button
            onClick={handleDropPin}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white hover:bg-rose-50 text-slate-800 hover:text-rose-900 border border-slate-300 hover:border-rose-400 shadow-xl transition-all group cursor-pointer"
          >
            <span className="text-sm font-bold">Drop Viewport Pin</span>
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700 group-hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>
          </button>

          {/* Action 3: General Feedback */}
          <button
            onClick={handleOpenForm}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-300 hover:border-emerald-400 shadow-xl transition-all group cursor-pointer"
          >
            <span className="text-sm font-bold">Quick Feedback Form</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 group-hover:scale-110 transition-transform">
              <MessageSquarePlus className="w-4 h-4" />
            </div>
          </button>

        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-sm sm:text-base shadow-2xl shadow-teal-600/40 border border-teal-500 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Report UI / Suggest Change</span>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronUp className="w-5 h-5" />
        </div>
      </button>

    </div>
  );
};
