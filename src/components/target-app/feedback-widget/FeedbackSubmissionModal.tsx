import React, { useState } from 'react';
import { useEvolutionSystem } from '../../../context/EvolutionSystemContext';
import { FeedbackCategory, DeviceContext } from '../../../types/feedback';
import { 
  Sparkles, 
  X, 
  Star, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Send, 
  CheckCircle2, 
  Code, 
  Target
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';

interface FeedbackSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSelector?: string | null;
}

export const FeedbackSubmissionModal: React.FC<FeedbackSubmissionModalProps> = ({
  isOpen,
  onClose,
  selectedSelector,
}) => {
  const { currentPage, deviceMode, submitUserFeedback } = useEvolutionSystem();

  const [category, setCategory] = useState<FeedbackCategory>('ui-issue');
  const [rating, setRating] = useState<number>(2);
  const [sentiment, setSentiment] = useState<'frustrated' | 'negative' | 'neutral' | 'positive'>('frustrated');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const categories: { id: FeedbackCategory; label: string; desc: string }[] = [
    { id: 'ui-issue', label: 'UI Issue / Glitch', desc: 'Layout misalignment, overlapping elements, or broken styles' },
    { id: 'usability-problem', label: 'Usability Friction', desc: 'Confusing flow, difficult interaction, or slow workflow' },
    { id: 'accessibility', label: 'Accessibility (a11y)', desc: 'Low color contrast, font too small, or missing touch targets' },
    { id: 'design-suggestion', label: 'Design Suggestion', desc: 'Aesthetic enhancement, modern theme, or cleaner layout' },
    { id: 'bug', label: 'Functional Bug', desc: 'Button click fails, input validation error, or unexpected state' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await submitUserFeedback({
        category,
        title,
        description,
        rating,
        sentiment,
        targetPage: currentPage,
        targetElementSelector: selectedSelector || undefined,
        deviceContext: deviceMode,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="feedback-modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white">Report UI Issue or Suggestion</h2>
              <p className="text-xs text-slate-400">AI will analyze this feedback & generate a structured proposal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Target Page & Selector Context */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-400">Target Page:</span>
              <span className="font-semibold text-white uppercase">{currentPage}</span>
            </div>
            {selectedSelector && (
              <div className="flex items-center gap-1 font-mono text-[11px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                <Code className="w-3 h-3" />
                <span>{selectedSelector}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-slate-400">
              {deviceMode === 'mobile' && <Smartphone className="w-3.5 h-3.5 text-indigo-400" />}
              {deviceMode === 'tablet' && <Tablet className="w-3.5 h-3.5 text-indigo-400" />}
              {deviceMode === 'desktop' && <Monitor className="w-3.5 h-3.5 text-indigo-400" />}
              <span className="capitalize">{deviceMode} Mode</span>
            </div>
          </div>

          {/* Rating & Sentiment */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Experience Rating & Sentiment
            </label>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-white/5">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      if (star <= 2) setSentiment('frustrated');
                      else if (star === 3) setSentiment('neutral');
                      else setSentiment('positive');
                    }}
                    className="p-1 text-slate-600 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Sentiment emojis */}
              <div className="flex items-center gap-2">
                {[
                  { id: 'frustrated', emoji: '😫', label: 'Frustrated' },
                  { id: 'negative', emoji: '🙁', label: 'Unhappy' },
                  { id: 'neutral', emoji: '😐', label: 'Neutral' },
                  { id: 'positive', emoji: '😃', label: 'Happy' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSentiment(s.id as any)}
                    className={`p-1.5 rounded-xl text-lg transition-all ${
                      sentiment === s.id
                        ? 'bg-indigo-500/20 border border-indigo-500/50 scale-110'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                    title={s.label}
                  >
                    {s.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    category === cat.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <p className="text-xs font-semibold text-white">{cat.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{cat.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Summary Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The login button is difficult to see on mobile devices"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Detailed Description & Context
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happened, what you expected, or how the layout should be improved..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
            <Button type="button" variant="ghost" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              size="md"
              loading={isSubmitting}
              icon={<Send className="w-4 h-4" />}
            >
              Analyze & Propose UI Change
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};
