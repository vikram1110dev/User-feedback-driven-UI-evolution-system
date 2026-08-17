import React from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Sliders, Shield } from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface SettingsPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const SettingsPage: React.FC<SettingsPageProps> = () => {
  return (
    <div className="py-4 px-2 sm:px-4 max-w-4xl mx-auto space-y-4" data-component-id="SettingsPage.tsx">
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white">System & Governance Settings</h2>
        <p className="text-xs text-slate-400 mt-0.5">Configure continuous UI evolution policies and human approval thresholds</p>
      </div>

      <div className="flex flex-col gap-4">
        
        {/* Governance Policy Card */}
        <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">Human-in-the-Loop Safeguards</h3>
              <p className="text-[11px] text-slate-400">Mandatory admin sign-off before deploy</p>
            </div>
          </div>
          
          <div className="space-y-2 pt-1 text-[11px]">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 gap-2">
              <span className="text-slate-300">Block auto-deployment without review</span>
              <Badge variant="success" size="sm">Strict Enforced</Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 gap-2">
              <span className="text-slate-300">Minimum WCAG contrast ratio</span>
              <span className="font-mono text-cyan-400 font-bold">4.5:1 (AA)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 gap-2">
              <span className="text-slate-300">Automated test pass rate required</span>
              <span className="font-mono text-emerald-400 font-bold">100% (5/5)</span>
            </div>
          </div>
        </div>

        {/* AI Model & Mutation Settings */}
        <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 flex-shrink-0">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">AI Mutation Parameters</h3>
              <p className="text-[11px] text-slate-400">Prompt & patch synthesis rules</p>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-[11px]">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 gap-2">
              <span className="text-slate-300">Analysis Engine</span>
              <span className="text-slate-200 font-medium">EvolvUI Gemini 3.6 Flash</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 gap-2">
              <span className="text-slate-300">Code Generation Target</span>
              <span className="text-indigo-300 font-mono">React 18 + Tailwind CSS</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 gap-2">
              <span className="text-slate-300">Max Visual Shift Tolerance</span>
              <span className="font-mono text-amber-400 font-bold">&lt; 25%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
