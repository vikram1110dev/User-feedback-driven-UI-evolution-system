import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-indigo-500/40 text-slate-100 shadow-2xl shadow-indigo-500/20 max-w-md">
      <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex-shrink-0">
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>
      <p className="text-sm font-medium flex-1 text-slate-200 leading-snug">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
