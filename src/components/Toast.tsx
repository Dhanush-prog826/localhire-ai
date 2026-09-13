import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-zinc-950 text-white rounded-xl p-4 shadow-2xl shadow-blue-950/60 border border-blue-900/60 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200 relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-400 to-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
      <div className="w-6 h-6 rounded-lg bg-blue-950/60 text-cyan-400 border border-blue-800/60 flex items-center justify-center shrink-0 mt-0.5">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <div className="flex-1 text-xs sm:text-sm font-mono leading-snug text-zinc-200">
        {message}
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-900 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
