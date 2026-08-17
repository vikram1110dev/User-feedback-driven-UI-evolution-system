import React from 'react';
import { useEvolutionSystem } from '../../../context/EvolutionSystemContext';
import { SYNTHETIC_PERSONA_SCENARIOS } from '../../../engine/syntheticFeedback';
import { Sparkles, Smartphone, Eye, MousePointerClick, Table, Zap } from 'lucide-react';

export const PersonaSimBar: React.FC = () => {
  const { triggerSyntheticScenario } = useEvolutionSystem();

  const getIcon = (id: string) => {
    if (id.includes('mobile')) return <Smartphone className="w-4 h-4 text-rose-600" />;
    if (id.includes('pricing')) return <Eye className="w-4 h-4 text-amber-600" />;
    if (id.includes('hero')) return <MousePointerClick className="w-4 h-4 text-teal-600" />;
    return <Table className="w-4 h-4 text-cyan-600" />;
  };

  return (
    <div className="w-full bg-white border-b border-slate-200 px-4 py-3 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Label */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm">
          <div className="p-1.5 rounded-xl bg-teal-100 text-teal-800 border border-teal-200">
            <Zap className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900">Synthetic User Feedback Simulation:</span>
          <span className="text-slate-500 hidden lg:inline text-xs">Inject 1-click real user feedback to trigger autonomous AI evolution</span>
        </div>

        {/* Persona quick triggers */}
        <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {SYNTHETIC_PERSONA_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => triggerSyntheticScenario(scenario.id)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-400 text-xs sm:text-sm font-medium text-slate-800 transition-all whitespace-nowrap shadow-xs group cursor-pointer"
            >
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 flex items-center justify-center group-hover:border-teal-300 transition-colors shadow-2xs">
                {getIcon(scenario.id)}
              </div>
              <div className="text-left">
                <span className="font-bold text-slate-900 block leading-tight">{scenario.personaName.split(' ')[0]}</span>
                <span className="text-xs text-slate-500 group-hover:text-teal-700 transition-colors block leading-tight">{scenario.title.slice(0, 26)}...</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
