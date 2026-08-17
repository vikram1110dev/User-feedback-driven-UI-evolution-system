import React from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Sparkles, ArrowRight, Play, CheckCircle2, Zap, AlertCircle } from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface HeroLandingPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const HeroLandingPage: React.FC<HeroLandingPageProps> = ({ flags }) => {
  const isDynamicCTA = flags.heroDynamicCTA;

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto text-center" data-component-id="HeroLandingPage.tsx">
      
      {/* State banner */}
      {isDynamicCTA ? (
        <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 max-w-lg mx-auto animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span><strong>UI Evolved:</strong> High-Conversion Shimmer CTA & Micro-Interactions Active</span>
        </div>
      ) : (
        <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs flex items-center gap-2 max-w-lg mx-auto">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span><strong>Baseline UI:</strong> Standard low-prominence conversion button</span>
        </div>
      )}

      {/* Pill header */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span>Next-Gen Frontend Change Governance</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-[1.1]">
        Continuous UI Evolution Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">Real User Feedback</span>
      </h1>

      <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Let customer sentiment drive frontend improvements. AI diagnoses issues, proposes code patches, and deploys approved UI changes with strict human-in-the-loop oversight.
      </p>

      {/* Conversion CTA Section */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4" data-element-selector="#hero-primary-cta">
        {isDynamicCTA ? (
          // EVOLVED STATE: Gradient shimmer, prominent icon, glass glow, micro-scale
          <button className="relative group overflow-hidden px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5">
            <span className="relative z-10 flex items-center gap-2">
              Start Autonomous Evolution
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
            </span>
          </button>
        ) : (
          // BASELINE STATE: Flat white/grey button
          <button className="px-5 py-2.5 bg-slate-200 text-slate-900 text-sm font-semibold rounded-lg hover:bg-white transition-colors">
            Get Started
          </button>
        )}

        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl glass-card text-slate-300 hover:text-white hover:border-white/20 text-sm font-medium transition-all">
          <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
          <span>Watch 2-Min Demo</span>
        </button>
      </div>

      {/* Feature Badges */}
      <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
        {[
          { title: 'Zero AI Drift', desc: 'Human approval required' },
          { title: 'Automated Tests', desc: 'A11y & responsive checks' },
          { title: '1-Click Rollback', desc: 'Instant reversion' },
          { title: 'Full Traceability', desc: 'Feedback to commit audit' },
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-white/5">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{item.title}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
