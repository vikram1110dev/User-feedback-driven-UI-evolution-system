import React from 'react';
import { useEvolutionSystem } from '../../../context/EvolutionSystemContext';
import { SYNTHETIC_PERSONA_SCENARIOS } from '../../../engine/syntheticFeedback';
import { UserCheck, Sparkles, Smartphone, Eye, MousePointerClick, Table } from 'lucide-react';
import { Badge } from '../../ui/Badge';

export const PersonaSimBar: React.FC = () => {
  const { triggerSyntheticScenario } = useEvolutionSystem();

  const getIcon = (id: string) => {
    if (id.includes('mobile')) return <Smartphone className="w-3.5 h-3.5 text-rose-400" />;
    if (id.includes('pricing')) return <Eye className="w-3.5 h-3.5 text-amber-400" />;
    if (id.includes('hero')) return <MousePointerClick className="w-3.5 h-3.5 text-indigo-400" />;
    return <Table className="w-3.5 h-3.5 text-cyan-400" />;
  };

  return (
    <div className="w-full bg-slate-900/90 border-b border-indigo-500/20 px-4 py-2.5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <div className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <span className="font-semibold text-slate-200">Synthetic User Feedback Generator:</span>
          <span className="text-slate-400 hidden sm:inline">Trigger 1-click real user simulation scenarios</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {SYNTHETIC_PERSONA_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => triggerSyntheticScenario(scenario.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-indigo-600/30 hover:border-indigo-500/50 border border-white/10 text-xs font-medium text-slate-200 transition-all whitespace-nowrap shadow-sm group"
            >
              {getIcon(scenario.id)}
              <span>{scenario.personaName.split(' ')[0]}: <span className="text-slate-400 group-hover:text-slate-200">{scenario.title.slice(0, 26)}...</span></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
