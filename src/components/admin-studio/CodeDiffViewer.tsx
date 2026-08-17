import React from 'react';
import { ComponentPatch } from '../../types/proposal';
import { FileCode, Sparkles, Check, Copy } from 'lucide-react';

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
    <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white font-mono text-sm shadow-md">
      
      {/* File Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-100 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <FileCode className="w-4 h-4 text-teal-700" />
          <span className="font-bold text-slate-900 text-xs sm:text-sm">{patch.filePath}</span>
          <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200">
            {patch.componentName}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 transition-colors text-xs font-semibold cursor-pointer shadow-2xs"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Summary Banner */}
      <div className="px-5 py-2 bg-teal-50 border-b border-teal-100 text-teal-900 text-xs sm:text-sm flex items-center gap-2 font-sans font-medium">
        <Sparkles className="w-4 h-4 flex-shrink-0 text-teal-600" />
        <span>{patch.summary}</span>
      </div>

      {/* Diff Content Lines */}
      <div className="p-4 overflow-x-auto space-y-1 leading-relaxed bg-slate-50/50">
        {patch.diffLines.map((line, idx) => {
          let lineStyles = 'text-slate-700 hover:bg-white';
          let prefix = ' ';
          if (line.type === 'added') {
            lineStyles = 'diff-added font-bold';
            prefix = '+';
          } else if (line.type === 'removed') {
            lineStyles = 'diff-removed opacity-85 font-medium';
            prefix = '-';
          }

          return (
            <div key={idx} className={`flex items-start gap-3 px-2.5 py-1 rounded-lg ${lineStyles}`}>
              <span className="w-8 text-right text-slate-400 select-none font-mono text-xs">
                {line.lineNo}
              </span>
              <span className="w-4 text-center select-none font-bold text-sm">
                {prefix}
              </span>
              <span className="flex-1 whitespace-pre font-mono text-xs sm:text-sm">{line.content.replace(/^[+-]\s*/, '')}</span>
            </div>
          );
        })}
      </div>

      {/* CSS Token Overrides */}
      {patch.cssTokenOverrides && Object.keys(patch.cssTokenOverrides).length > 0 && (
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-xs sm:text-sm font-sans">
          <span className="text-slate-700 font-extrabold uppercase tracking-wider text-xs block mb-1.5">
            Dynamic Token Modifications:
          </span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(patch.cssTokenOverrides).map(([key, val]) => (
              <span key={key} className="px-2.5 py-1 rounded-lg bg-white text-teal-800 border border-teal-200 text-xs font-mono font-semibold shadow-2xs">
                {key}: <strong className="text-slate-900">{val}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
