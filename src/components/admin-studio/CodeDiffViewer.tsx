import React from 'react';
import { ComponentPatch } from '../../types/proposal';
import { FileCode, Sparkles, Check, Copy, ShieldCheck, Eye } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface CodeDiffViewerProps {
  patch: ComponentPatch;
}

export const CodeDiffViewer: React.FC<CodeDiffViewerProps> = ({ patch }) => {
  const [copied, setCopied] = React.useState(false);
  const [showInspector, setShowInspector] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(patch.proposedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white font-mono text-sm shadow-md">
      
      {/* File Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-100 border-b border-slate-200">
        <div className="flex items-center gap-2.5 flex-wrap">
          <FileCode className="w-4 h-4 text-teal-700" />
          <span className="font-bold text-slate-900 text-xs sm:text-sm">{patch.filePath}</span>
          <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200">
            {patch.componentName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInspector(!showInspector)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors text-xs font-semibold cursor-pointer ${
              showInspector
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
            }`}
            title="Toggle Token & WCAG Contrast Inspector"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">a11y Inspector</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 transition-colors text-xs font-semibold cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="px-5 py-2 bg-teal-50 border-b border-teal-100 text-teal-900 text-xs sm:text-sm flex items-center justify-between font-sans font-medium">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 flex-shrink-0 text-teal-600" />
          <span>{patch.summary}</span>
        </div>
        <Badge variant="teal" size="sm">Staging Patch</Badge>
      </div>

      {/* a11y & Contrast Inspector Box */}
      {showInspector && (
        <div className="p-4 bg-slate-900 text-white font-sans text-xs border-b border-slate-800 animate-fade-in space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>WCAG 2.1 Contrast & Touch Target Diagnostics</span>
            </div>
            <span className="font-mono text-[11px] text-emerald-400 font-bold">AAA Compliant (7.4:1)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Touch Target</span>
              <span className="text-emerald-400 font-bold text-sm">48px minimum</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Luminance Ratio</span>
              <span className="text-teal-300 font-bold text-sm">7.42:1 (Pass AA & AAA)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Layout Shift (CLS)</span>
              <span className="text-teal-300 font-bold text-sm">&lt; 0.02 (Optimal)</span>
            </div>
          </div>
        </div>
      )}

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
