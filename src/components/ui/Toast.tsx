import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up flex items-center gap-4 px-6 py-4 rounded-3xl bg-white border-2 border-teal-500 text-slate-900 shadow-2xl shadow-teal-500/20 max-w-lg">
      <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 flex-shrink-0">
        <Sparkles className="w-5 h-5 animate-pulse" />
      </div>
      <p className="text-sm sm:text-base font-semibold flex-1 text-slate-800 leading-snug">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
