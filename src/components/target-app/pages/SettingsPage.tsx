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
    <div className="py-6 px-3 sm:px-6 max-w-4xl mx-auto space-y-6" data-component-id="SettingsPage.tsx">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">System & Governance Settings</h2>
        <p className="text-sm text-slate-600 mt-1 font-medium">Configure continuous UI evolution policies and human approval thresholds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Governance Policy Card */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">Human-in-the-Loop Safeguards</h3>
              <p className="text-xs text-slate-500 font-medium">Mandatory admin sign-off before deploy</p>
            </div>
          </div>
          
          <div className="space-y-3 pt-2 text-xs sm:text-sm">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 gap-2">
              <span className="text-slate-800 font-medium">Block auto-deploy without review</span>
              <Badge variant="success" size="sm">Strict Enforced</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 gap-2">
              <span className="text-slate-800 font-medium">Minimum WCAG contrast ratio</span>
              <span className="font-mono text-teal-700 font-bold">4.5:1 (AA)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 gap-2">
              <span className="text-slate-800 font-medium">Automated test pass rate required</span>
              <span className="font-mono text-emerald-700 font-bold">100% (5/5)</span>
            </div>
          </div>
        </div>

        {/* AI Model & Mutation Settings */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-200 flex-shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">AI Mutation Parameters</h3>
              <p className="text-xs text-slate-500 font-medium">Prompt & patch synthesis rules</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs sm:text-sm">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 gap-2">
              <span className="text-slate-800 font-medium">Analysis Engine</span>
              <span className="text-slate-900 font-semibold">EvolvUI Gemini 3.6 Flash</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 gap-2">
              <span className="text-slate-800 font-medium">Code Generation Target</span>
              <span className="text-teal-700 font-mono font-bold">React 18 + Tailwind</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 gap-2">
              <span className="text-slate-800 font-medium">Max Visual Shift Tolerance</span>
              <span className="font-mono text-amber-700 font-bold">&lt; 25%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
