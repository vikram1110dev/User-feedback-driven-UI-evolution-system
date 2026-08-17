import React from 'react';
import { useEvolutionSystem } from '../../../context/EvolutionSystemContext';
import { SYNTHETIC_PERSONA_SCENARIOS } from '../../../engine/syntheticFeedback';
import { Sparkles, Smartphone, Eye, MousePointerClick, Table, Zap } from 'lucide-react';

export const PersonaSimBar: React.FC = () => {
  const { triggerSyntheticScenario } = useEvolutionSystem();

  const getIcon = (id: string) => {
    if (id.includes('mobile')) return <Smartphone className="w-3 h-3 text-rose-400" />;
    if (id.includes('pricing')) return <Eye className="w-3 h-3 text-amber-400" />;
    if (id.includes('hero')) return <MousePointerClick className="w-3 h-3 text-indigo-400" />;
    return <Table className="w-3 h-3 text-cyan-400" />;
  };

  return (
    <div className="w-full bg-[#0b0f19] border-b border-white/[0.06] px-4 py-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Label */}
        <div className="flex items-center gap-2 text-xs">
          <div className="p-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Zap className="w-3 h-3" />
          </div>
          <span className="font-semibold text-slate-200">Simulation Persona Engine:</span>
          <span className="text-slate-400 hidden lg:inline text-[11px]">Inject live synthetic feedback payloads to test UI evolution</span>
        </div>

        {/* Persona quick triggers */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {SYNTHETIC_PERSONA_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => triggerSyntheticScenario(scenario.id)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-indigo-950/60 border border-white/[0.08] hover:border-indigo-500/40 text-[11px] font-medium text-slate-200 transition-all whitespace-nowrap shadow-sm group"
            >
              <div className="p-1 rounded bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                {getIcon(scenario.id)}
              </div>
              <div className="text-left">
                <span className="font-semibold text-slate-200 block leading-tight">{scenario.personaName.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-400 group-hover:text-indigo-300 transition-colors block leading-tight">{scenario.title.slice(0, 24)}...</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
