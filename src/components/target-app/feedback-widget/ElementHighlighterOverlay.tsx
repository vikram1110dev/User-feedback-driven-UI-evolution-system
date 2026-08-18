import React, { useState, useEffect } from 'react';
import { useEvolutionSystem } from '../../../context/EvolutionSystemContext';
import { MousePointer, X } from 'lucide-react';

interface ElementHighlighterOverlayProps {
  onElementSelected: (selector: string) => void;
}

export const ElementHighlighterOverlay: React.FC<ElementHighlighterOverlayProps> = ({ onElementSelected }) => {
  const { isFeedbackModeActive, setIsFeedbackModeActive } = useEvolutionSystem();
  const [hoveredRect, setHoveredRect] = useState<{ top: number; left: number; width: number; height: number; selector: string } | null>(null);

  useEffect(() => {
    if (!isFeedbackModeActive) {
      setHoveredRect(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target) return;

      // Ignore overlay elements
      if (target.closest('#feedback-overlay-container') || target.closest('#feedback-modal-root')) {
        return;
      }

      // Find closest interactive or container element with data-element-selector or id or class
      const selectorTarget = target.closest('[data-element-selector]') || target.closest('[data-component-id]') || target;
      const rect = selectorTarget.getBoundingClientRect();
      const selector = selectorTarget.getAttribute('data-element-selector') || 
                       selectorTarget.getAttribute('data-component-id') || 
                       `#${selectorTarget.id || selectorTarget.tagName.toLowerCase()}`;

      setHoveredRect({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
        selector,
      });
    };

    const handleClick = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target || target.closest('#feedback-overlay-container') || target.closest('#feedback-modal-root')) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const selectorTarget = target.closest('[data-element-selector]') || target.closest('[data-component-id]') || target;
      const selector = selectorTarget.getAttribute('data-element-selector') || 
                       selectorTarget.getAttribute('data-component-id') || 
                       `#${selectorTarget.id || selectorTarget.tagName.toLowerCase()}`;

      onElementSelected(selector);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick, true);
    };
  }, [isFeedbackModeActive, onElementSelected]);

  if (!isFeedbackModeActive) return null;

  return (
    <div id="feedback-overlay-container" className="fixed inset-0 z-50 pointer-events-none">
      
      {/* Top Banner Guide */}
      <div className="pointer-events-auto fixed top-20 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-2xl bg-indigo-600/90 backdrop-blur-xl border border-indigo-400/40 text-white text-xs font-semibold shadow-2xl flex items-center gap-3 animate-fade-in">
        <MousePointer className="w-4 h-4 animate-bounce" />
        <span>Inspect Mode: Hover & click any UI component to annotate</span>
        <button
          onClick={() => setIsFeedbackModeActive(false)}
          className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-2"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dynamic Hover Bounding Box */}
      {hoveredRect && (
        <div
          style={{
            top: `${hoveredRect.top}px`,
            left: `${hoveredRect.left}px`,
            width: `${hoveredRect.width}px`,
            height: `${hoveredRect.height}px`,
          }}
          className="absolute border-2 border-indigo-400 bg-indigo-500/15 rounded-xl transition-all duration-75 pointer-events-none shadow-lg shadow-indigo-500/30"
        >
          <div className="absolute -top-7 left-0 px-2 py-0.5 rounded-md bg-indigo-600 text-white font-mono text-[11px] font-bold shadow-md whitespace-nowrap">
            {hoveredRect.selector}
          </div>
        </div>
      )}
    </div>
  );
};
