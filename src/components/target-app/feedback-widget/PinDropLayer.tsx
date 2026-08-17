import React from 'react';
import { useEvolutionSystem } from '../../../context/EvolutionSystemContext';
import { MapPin, X } from 'lucide-react';
import { PinLocation } from '../../../types/feedback';

interface PinDropLayerProps {
  onPinPlaced: (location: PinLocation) => void;
}

export const PinDropLayer: React.FC<PinDropLayerProps> = ({ onPinPlaced }) => {
  const { isPinDropModeActive, setIsPinDropModeActive, currentPinLocation } = useEvolutionSystem();

  if (!isPinDropModeActive) {
    if (!currentPinLocation) return null;
    // Render existing dropped pin
    return (
      <div
        style={{
          top: `${currentPinLocation.y}%`,
          left: `${currentPinLocation.x}%`,
        }}
        className="absolute -translate-x-1/2 -translate-y-full z-30 pointer-events-none"
      >
        <div className="relative flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-xl shadow-rose-500/50 pin-beacon border-2 border-white">
            1
          </div>
          <div className="w-1.5 h-3 bg-rose-500 rounded-b-sm" />
        </div>
      </div>
    );
  }

  const handleLayerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onPinPlaced({ x, y });
  };

  return (
    <div
      id="feedback-pin-overlay"
      onClick={handleLayerClick}
      className="absolute inset-0 z-40 bg-indigo-950/20 backdrop-blur-[2px] cursor-crosshair flex flex-col items-center justify-start pt-6"
    >
      <div className="px-5 py-2 rounded-2xl bg-rose-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-fade-in pointer-events-auto">
        <MapPin className="w-4 h-4" />
        <span>Click anywhere on this screen to drop an annotation pin</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPinDropModeActive(false);
          }}
          className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
