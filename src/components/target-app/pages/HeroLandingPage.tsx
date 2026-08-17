import React from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Sparkles, Play, CheckCircle2, ShieldCheck, AlertCircle, Cpu, GitPullRequest, Eye } from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface HeroLandingPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const HeroLandingPage: React.FC<HeroLandingPageProps> = ({ flags }) => {
  const isDynamicCTA = flags.heroDynamicCTA;

  return (
    <div className="py-8 px-2 sm:px-4 max-w-5xl mx-auto text-center" data-component-id="HeroLandingPage.tsx">
      
      {/* State banner */}
      {isDynamicCTA ? (
        <div className="mb-6 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 max-w-md mx-auto shadow-md animate-fade-in">
          <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold block">UI Evolved: High-Conversion CTA Active</span>
            <span className="text-[11px] text-emerald-400/80">Gradient shimmer & elevated micro-interactions enabled</span>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs flex items-center gap-2.5 max-w-md mx-auto">
          <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 flex-shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold block">Baseline UI: Standard Low-Impact Button</span>
            <span className="text-[11px] text-amber-300/70">Subdued conversion triggers lacking visual prominence</span>
          </div>
        </div>
      )}

      {/* Pill header */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-5 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span>Continuous Frontend Change Governance</span>
      </div>

      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-[1.15]">
        Evolve Your Frontend with <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
          Real User Feedback & AI
        </span>
      </h1>

      <p className="mt-4 text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Let customer sentiment drive UI improvements safely. AI diagnoses friction, synthesizes code diffs, and runs automated test suites with strict human approval gates.
      </p>

      {/* Conversion CTA Section */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3" data-element-selector="#hero-primary-cta">
        {isDynamicCTA ? (
          // EVOLVED: Gradient shimmer, prominent icon, glass glow, micro-scale
          <button className="relative group overflow-hidden px-7 py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2">
            <span className="relative z-10 flex items-center gap-2">
              Start Autonomous Evolution
              <Sparkles className="w-4 h-4" />
            </span>
          </button>
        ) : (
          // BASELINE: Flat button
          <button className="px-4 py-2 bg-slate-200 text-slate-900 text-xs font-semibold rounded hover:bg-white transition-colors">
            Get Started
          </button>
        )}

        <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-all">
          <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
          <span>Interactive Walkthrough</span>
        </button>
      </div>

      {/* Live Metrics Ribbon */}
      <div className="mt-10 pt-6 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
        {[
          { title: 'Zero AI Drift', desc: 'Mandatory HITL sign-off', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> },
          { title: '5 Quality Gates', desc: 'A11y, build, viewports', icon: <Cpu className="w-3.5 h-3.5 text-cyan-400" /> },
          { title: '1-Click Rollback', desc: 'Instant state restore', icon: <GitPullRequest className="w-3.5 h-3.5 text-indigo-400" /> },
          { title: 'Traceability', desc: 'Feedback to commit audit', icon: <Eye className="w-3.5 h-3.5 text-purple-400" /> },
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-white/5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
              {item.icon}
              <span>{item.title}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
