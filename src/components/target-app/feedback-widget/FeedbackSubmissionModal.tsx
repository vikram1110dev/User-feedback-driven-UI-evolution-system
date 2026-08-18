import React, { useState } from 'react';
import { useEvolutionSystem } from '../../../context/EvolutionSystemContext';
import { FeedbackCategory } from '../../../types/feedback';
import { 
  Sparkles, 
  X, 
  Star, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Send, 
  Code, 
  Target
} from 'lucide-react';
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
  const { 
    currentPage, 
    deviceMode, 
    submitUserFeedback, 
    geminiApiKey, 
    selectedModel 
  } = useEvolutionSystem();

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

  const isLiveGemini = geminiApiKey && geminiApiKey.trim().length > 0;

  return (
    <div id="feedback-modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">Report UI Issue or Suggestion</h2>
                {isLiveGemini ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-800 border border-teal-200 uppercase">
                    ⚡ {selectedModel}
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                    🤖 Autonomous Engine
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 font-medium">AI will analyze this feedback & generate a structured proposal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>


        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Target Page & Selector Context */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-600" />
              <span className="text-slate-500 font-medium">Target Screen:</span>
              <span className="font-bold text-slate-900 uppercase">{currentPage}</span>
            </div>
            {selectedSelector && (
              <div className="flex items-center gap-1.5 font-mono text-xs text-teal-800 bg-teal-100 px-3 py-1 rounded-lg border border-teal-200">
                <Code className="w-3.5 h-3.5" />
                <span>{selectedSelector}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              {deviceMode === 'mobile' && <Smartphone className="w-4 h-4 text-teal-600" />}
              {deviceMode === 'tablet' && <Tablet className="w-4 h-4 text-teal-600" />}
              {deviceMode === 'desktop' && <Monitor className="w-4 h-4 text-teal-600" />}
              <span className="capitalize">{deviceMode} Mode</span>
            </div>
          </div>

          {/* Rating & Sentiment */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              Experience Rating & Sentiment
            </label>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5">
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
                    className="p-1.5 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Sentiment emojis */}
              <div className="flex items-center gap-2.5">
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
                    className={`p-2 rounded-2xl text-2xl transition-all cursor-pointer ${
                      sentiment === s.id
                        ? 'bg-teal-100 border-2 border-teal-500 scale-110 shadow-xs'
                        : 'opacity-50 hover:opacity-100 hover:bg-slate-200'
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
            <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    category === cat.id
                      ? 'bg-teal-50 border-2 border-teal-600 text-teal-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-sm font-bold text-slate-900">{cat.label}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{cat.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              Summary Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The login button is difficult to see on mobile devices"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 font-medium"
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              Detailed Description & Context
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happened, what you expected, or how the layout should be improved..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 font-medium resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-end gap-3.5 border-t border-slate-200">
            <Button type="button" variant="secondary" size="md" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              size="md"
              loading={isSubmitting}
              icon={<Send className="w-5 h-5" />}
            >
              {isSubmitting
                ? isLiveGemini
                  ? 'Gemini Synthesizing Patches...'
                  : 'Analyzing & Synthesizing Patches...'
                : 'Analyze & Propose UI Change'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};
