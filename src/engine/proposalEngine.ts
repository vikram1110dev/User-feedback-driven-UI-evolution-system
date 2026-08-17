import { UserFeedback } from '../types/feedback';
import { UIChangeProposal, ComponentPatch } from '../types/proposal';
import { analyzeFeedbackWithAI } from './aiFeedbackAnalyzer';

export function createProposalFromFeedback(feedback: UserFeedback): UIChangeProposal {
  const analysis = analyzeFeedbackWithAI(feedback);
  const now = new Date().toISOString();
  const proposalId = `prop-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;

  // Generate realistic component patches and code diffs based on affected page/components
  const patches: ComponentPatch[] = [];

  if (analysis.affectedPage === 'login') {
    patches.push({
      filePath: 'src/components/target-app/pages/LoginPage.tsx',
      componentName: 'LoginPage.tsx',
      summary: 'Responsive button scaling, 48px touch targets, and mobile viewport spacing fix',
      originalSnippet: `<button className="px-4 py-2 bg-indigo-600 text-sm font-medium rounded">
  Sign In
</button>`,
      proposedSnippet: `<button className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 min-h-[48px] flex items-center justify-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
  <span>Sign In to Account</span>
  <ArrowRight className="w-4 h-4 ml-2" />
</button>`,
      diffLines: [
        { type: 'context', lineNo: 42, content: '  <div className="mt-6 flex flex-col gap-4">' },
        { type: 'removed', lineNo: 43, content: '-   <button className="px-4 py-2 bg-indigo-600 text-sm font-medium rounded">' },
        { type: 'removed', lineNo: 44, content: '-     Sign In' },
        { type: 'removed', lineNo: 45, content: '-   </button>' },
        { type: 'added', lineNo: 43, content: '+   <button className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 min-h-[48px] flex items-center justify-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">' },
        { type: 'added', lineNo: 44, content: '+     <span>Sign In to Account</span>' },
        { type: 'added', lineNo: 45, content: '+     <ArrowRight className="w-4 h-4 ml-2" />' },
        { type: 'added', lineNo: 46, content: '+   </button>' },
        { type: 'context', lineNo: 47, content: '  </div>' },
      ],
      cssTokenOverrides: {
        '--login-btn-height': '48px',
        '--login-btn-mobile-width': '100%',
        '--login-btn-font-weight': '600',
      }
    });
  } else if (analysis.affectedPage === 'pricing') {
    patches.push({
      filePath: 'src/components/target-app/pages/PricingPage.tsx',
      componentName: 'PricingPage.tsx',
      summary: 'Elevate text contrast tokens to WCAG AAA compliance and accent featured tier card',
      originalSnippet: `<div className="text-slate-500 text-xs">
  Includes 50k automated requests per month
</div>`,
      proposedSnippet: `<div className="text-slate-200 font-medium text-sm">
  Includes 50k automated requests per month
</div>`,
      diffLines: [
        { type: 'context', lineNo: 78, content: '  <div className="mt-4 space-y-3">' },
        { type: 'removed', lineNo: 79, content: '-   <div className="text-slate-500 text-xs">' },
        { type: 'added', lineNo: 79, content: '+   <div className="text-slate-200 font-medium text-sm">' },
        { type: 'context', lineNo: 80, content: '      Includes 50k automated requests per month' },
        { type: 'context', lineNo: 81, content: '    </div>' },
      ],
      cssTokenOverrides: {
        '--pricing-card-contrast': '7.1:1',
        '--pricing-feature-color': '#e2e8f0',
      }
    });
  } else if (analysis.affectedPage === 'hero') {
    patches.push({
      filePath: 'src/components/target-app/pages/HeroLandingPage.tsx',
      componentName: 'HeroLandingPage.tsx',
      summary: 'Upgrade CTA with dynamic glow shimmer, micro-interaction state, and prominent icon',
      originalSnippet: `<button className="bg-white text-black px-4 py-2">
  Get Started
</button>`,
      proposedSnippet: `<button className="relative group overflow-hidden px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5">
  <span className="relative z-10 flex items-center gap-2">Start Autonomous UI Evolution <Sparkles className="w-5 h-5" /></span>
</button>`,
      diffLines: [
        { type: 'context', lineNo: 28, content: '  <div className="flex items-center gap-4 mt-8">' },
        { type: 'removed', lineNo: 29, content: '-   <button className="bg-white text-black px-4 py-2">Get Started</button>' },
        { type: 'added', lineNo: 29, content: '+   <button className="relative group overflow-hidden px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5">' },
        { type: 'added', lineNo: 30, content: '+     <span className="relative z-10 flex items-center gap-2">Start Autonomous UI Evolution <Sparkles className="w-5 h-5" /></span>' },
        { type: 'added', lineNo: 31, content: '+   </button>' },
        { type: 'context', lineNo: 32, content: '  </div>' },
      ],
      cssTokenOverrides: {
        '--hero-cta-shadow': '0 20px 25px -5px rgba(99, 102, 241, 0.4)',
      }
    });
  } else {
    patches.push({
      filePath: `src/components/target-app/pages/${analysis.affectedPage}.tsx`,
      componentName: `${analysis.affectedPage}.tsx`,
      summary: `Automated UI refinement patch for ${analysis.affectedPage}`,
      originalSnippet: `<div className="p-4 bg-slate-900 border border-slate-800">...</div>`,
      proposedSnippet: `<div className="p-6 bg-slate-900/80 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-2xl transition-all duration-300">...</div>`,
      diffLines: [
        { type: 'context', lineNo: 15, content: '  return (' },
        { type: 'removed', lineNo: 16, content: '-   <div className="p-4 bg-slate-900 border border-slate-800">' },
        { type: 'added', lineNo: 16, content: '+   <div className="p-6 bg-slate-900/80 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-2xl transition-all duration-300">' },
        { type: 'context', lineNo: 17, content: '      {/* Enhanced children */}' },
        { type: 'context', lineNo: 18, content: '    </div>' },
      ],
    });
  }

  const proposal: UIChangeProposal = {
    id: proposalId,
    feedbackId: feedback.id,
    createdAt: now,
    updatedAt: now,
    title: `UI Evolution: ${analysis.suggestedSolution.slice(0, 65)}...`,
    problemSummary: feedback.description,
    rootCauseAnalysis: analysis.rootCause,
    category: analysis.category,
    priority: analysis.priority,
    affectedPage: analysis.affectedPage,
    affectedComponents: analysis.affectedComponents,
    suggestedSolution: analysis.suggestedSolution,
    patches,
    riskAssessment: {
      level: analysis.riskLevel,
      riskFactors: analysis.riskFactors,
      mitigationStrategy: analysis.mitigationStrategy,
    },
    expectedImpact: {
      uxImprovement: analysis.expectedUXGain,
      targetMetrics: ['Mobile Conversion Rate', 'WCAG a11y Score', 'User Friction Index'],
      accessibilityScoreDelta: analysis.accessibilityDelta,
    },
    status: 'pending-admin-review',
  };

  return proposal;
}
