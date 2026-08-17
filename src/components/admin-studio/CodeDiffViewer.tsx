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
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-950 font-mono text-xs shadow-xl">
      
      {/* File Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-200">{patch.filePath}</span>
          <Badge variant="purple" size="sm">
            {patch.componentName}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
          </button>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="px-4 py-2 bg-indigo-500/10 border-b border-indigo-500/20 text-indigo-300 text-[11px] flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{patch.summary}</span>
      </div>

      {/* Diff Content Lines */}
      <div className="p-3 overflow-x-auto divide-y divide-white/[0.03] space-y-0.5 leading-relaxed">
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
              <span className="flex-1 whitespace-pre">{line.content.replace(/^[+-]\s*/, '')}</span>
            </div>
          );
        })}
      </div>

      {/* CSS Token Overrides if present */}
      {patch.cssTokenOverrides && Object.keys(patch.cssTokenOverrides).length > 0 && (
        <div className="p-3 bg-slate-900/60 border-t border-white/5 text-[11px]">
          <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1.5">
            Dynamic CSS Token Modifications:
          </span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(patch.cssTokenOverrides).map(([key, val]) => (
              <span key={key} className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                {key}: <strong className="text-white">{val}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
