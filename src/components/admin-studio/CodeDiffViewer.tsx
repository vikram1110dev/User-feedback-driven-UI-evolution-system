import React from 'react';
import { ComponentPatch } from '../../types/proposal';
import { FileCode, Sparkles, Check, Copy } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface CodeDiffViewerProps {
  patch: ComponentPatch;
}

export const CodeDiffViewer: React.FC<CodeDiffViewerProps> = ({ patch }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(patch.proposedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#090d16] font-mono text-xs shadow-xl">
      
      {/* File Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <FileCode className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-slate-200 text-xs">{patch.filePath}</span>
          <span className="px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 text-[10px] border border-indigo-500/20">
            {patch.componentName}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[10px]"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Summary Banner */}
      <div className="px-4 py-1.5 bg-indigo-950/30 border-b border-indigo-500/10 text-indigo-300 text-[11px] flex items-center gap-2 font-sans">
        <Sparkles className="w-3 h-3 flex-shrink-0 text-indigo-400" />
        <span>{patch.summary}</span>
      </div>

      {/* Diff Content Lines */}
      <div className="p-3 overflow-x-auto space-y-0.5 leading-relaxed bg-[#060911]">
        {patch.diffLines.map((line, idx) => {
          let lineStyles = 'text-slate-400 hover:bg-white/[0.02]';
          let prefix = ' ';
          if (line.type === 'added') {
            lineStyles = 'diff-added font-semibold';
            prefix = '+';
          } else if (line.type === 'removed') {
            lineStyles = 'diff-removed opacity-75';
            prefix = '-';
          }

          return (
            <div key={idx} className={`flex items-start gap-3 px-2 py-0.5 rounded-sm ${lineStyles}`}>
              <span className="w-6 text-right text-slate-600 select-none font-mono text-[10px]">
                {line.lineNo}
              </span>
              <span className="w-3 text-center select-none font-bold">
                {prefix}
              </span>
              <span className="flex-1 whitespace-pre font-mono text-[11px]">{line.content.replace(/^[+-]\s*/, '')}</span>
            </div>
          );
        })}
      </div>

      {/* CSS Token Overrides */}
      {patch.cssTokenOverrides && Object.keys(patch.cssTokenOverrides).length > 0 && (
        <div className="p-3 bg-slate-900/60 border-t border-white/[0.06] text-[11px] font-sans">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
            Dynamic Token Modifications:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(patch.cssTokenOverrides).map(([key, val]) => (
              <span key={key} className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-[10px] font-mono">
                {key}: <strong className="text-white">{val}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
