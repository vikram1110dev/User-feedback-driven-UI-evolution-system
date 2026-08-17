import React from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Sparkles, Play, ShieldCheck, AlertCircle, Cpu, GitPullRequest, Eye } from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface HeroLandingPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const HeroLandingPage: React.FC<HeroLandingPageProps> = ({ flags }) => {
  const isDynamicCTA = flags.heroDynamicCTA;

  return (
    <div className="py-10 px-3 sm:px-6 max-w-5xl mx-auto text-center" data-component-id="HeroLandingPage.tsx">
      
      {/* State banner */}
      {isDynamicCTA ? (
        <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center gap-3 max-w-lg mx-auto shadow-xs animate-fade-in">
          <div className="p-1.5 rounded-xl bg-emerald-200/70 text-emerald-800 flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-sm">UI Evolved: High-Conversion CTA Active</span>
            <span className="text-xs text-emerald-700">Teal gradient shimmer & elevated micro-interactions enabled</span>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-3 max-w-lg mx-auto shadow-xs">
          <div className="p-1.5 rounded-xl bg-amber-200/70 text-amber-800 flex-shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-sm">Baseline UI: Standard Low-Impact Button</span>
            <span className="text-xs text-amber-700">Subdued conversion triggers lacking visual prominence</span>
          </div>
        </div>
      )}

      {/* Pill header */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-sm font-bold mb-6 shadow-xs">
        <Sparkles className="w-4 h-4 text-teal-600" />
        <span>Continuous Frontend Change Governance</span>
      </div>

      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-slate-900 tracking-tight leading-[1.12]">
        Evolve Your Frontend with <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600">
          Real User Feedback & AI
        </span>
      </h1>

      <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
        Let customer sentiment drive UI improvements safely. AI diagnoses friction, synthesizes code diffs, and runs automated test suites with strict human approval gates.
      </p>

      {/* Conversion CTA Section */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" data-element-selector="#hero-primary-cta">
        {isDynamicCTA ? (
          // EVOLVED: Teal gradient shimmer, prominent icon, large touch target
          <button className="relative group overflow-hidden px-8 py-4 bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl shadow-teal-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-3 cursor-pointer">
            <span className="relative z-10 flex items-center gap-2.5">
              Start Autonomous Evolution
              <Sparkles className="w-5 h-5" />
            </span>
          </button>
        ) : (
          // BASELINE: Flat button
          <button className="px-5 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-xl hover:bg-slate-900 transition-colors">
            Get Started
          </button>
        )}

        <button className="flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 text-base font-bold border border-slate-300 transition-all shadow-sm cursor-pointer">
          <Play className="w-4 h-4 text-teal-600 fill-teal-600" />
          <span>Interactive Walkthrough</span>
        </button>
      </div>

      {/* Live Metrics Ribbon */}
      <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
        {[
          { title: 'Zero AI Drift', desc: 'Mandatory HITL sign-off', icon: <ShieldCheck className="w-5 h-5 text-teal-600" /> },
          { title: '5 Quality Gates', desc: 'A11y, build, viewports', icon: <Cpu className="w-5 h-5 text-emerald-600" /> },
          { title: '1-Click Rollback', desc: 'Instant state restore', icon: <GitPullRequest className="w-5 h-5 text-cyan-600" /> },
          { title: 'Traceability', desc: 'Feedback to commit audit', icon: <Eye className="w-5 h-5 text-teal-700" /> },
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              {item.icon}
              <span>{item.title}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
