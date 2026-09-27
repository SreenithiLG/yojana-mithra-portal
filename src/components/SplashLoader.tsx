import React, { useEffect, useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface SplashLoaderProps {
  onComplete: () => void;
  brandTitle: string;
  brandTagline: string;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({
  onComplete,
  brandTitle,
  brandTagline
}) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(onComplete, 350);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-white transition-opacity duration-300 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle National Accent Band */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-white to-emerald-500" />

      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        {/* Emblem / Shield Badge */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-2xl">
          <div className="absolute -inset-1 rounded-2xl bg-amber-500/20 blur-sm animate-pulse" />
          <ShieldCheck className="h-12 w-12 text-amber-500 relative z-10" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          {brandTitle}
        </h1>
        <p className="text-sm font-medium text-slate-400 mb-6">
          {brandTagline}
        </p>

        {/* Minimal Progress Line */}
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-amber-500 rounded-full animate-[progress_1.8s_ease-in-out_infinite]" />
        </div>

        <button
          onClick={() => {
            setFade(true);
            setTimeout(onComplete, 200);
          }}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <span>Skip to Portal</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="absolute bottom-6 text-xs text-slate-500 font-mono tracking-wider">
        GOVERNMENT OF INDIA · CITIZEN WELFARE INITIATIVE
      </div>
    </div>
  );
};
