import React from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Sliders, Shield, Bell, Key, RefreshCw } from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface SettingsPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const SettingsPage: React.FC<SettingsPageProps> = () => {
  return (
    <div className="py-6 px-4 max-w-4xl mx-auto space-y-6" data-component-id="SettingsPage.tsx">
      <div>
        <h2 className="text-2xl font-bold font-display text-white">System & Governance Settings</h2>
        <p className="text-xs text-slate-400">Configure continuous UI evolution policies and human approval thresholds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Governance Policy Card */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Human-in-the-Loop Safeguards</h3>
              <p className="text-xs text-slate-400">Mandatory admin sign-off</p>
            </div>
          </div>
          
          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60">
              <span>Block auto-deployment without review</span>
              <Badge variant="success" size="sm">Strict Enforced</Badge>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60">
              <span>Minimum WCAG contrast ratio</span>
              <span className="font-mono text-cyan-400 font-bold">4.5:1 (AA)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60">
              <span>Automated test pass rate required</span>
              <span className="font-mono text-emerald-400 font-bold">100% (5/5 tests)</span>
            </div>
          </div>
        </div>

        {/* AI Model & Mutation Settings */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Mutation Parameters</h3>
              <p className="text-xs text-slate-400">Prompt & patch synthesis</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60">
              <span>Analysis Engine</span>
              <span className="text-slate-300 font-medium">EvolvUI Gemini 3.6 Flash</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60">
              <span>Code Generation Target</span>
              <span className="text-indigo-300 font-mono">React 18 + Tailwind CSS</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60">
              <span>Max Visual Shift Tolerance</span>
              <span className="font-mono text-amber-400 font-bold">&lt; 25%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
