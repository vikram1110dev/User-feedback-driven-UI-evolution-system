import React from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Check, Zap, Sparkles, Shield, AlertCircle } from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface PricingPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const PricingPage: React.FC<PricingPageProps> = ({ flags }) => {
  const isHighContrast = flags.pricingHighContrast;

  const tiers = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Essential automated feedback loops for emerging products.',
      features: [
        'Up to 1,000 feedback submissions/mo',
        'Automatic AI feedback categorization',
        'Human-in-the-Loop Admin Dashboard',
        'Standard testing pipeline checks',
        'Community Discord support',
      ],
      popular: false,
      cta: 'Start Free Trial',
    },
    {
      name: 'Continuous Evolution Pro',
      price: '$149',
      period: '/month',
      description: 'Advanced real-time mutation pipeline with synthetic testing.',
      features: [
        'Unlimited feedback submissions & pins',
        'Instant AI Change Proposal generator',
        'Multi-device visual regression test matrix',
        'Live Split-Screen preview & 1-click rollback',
        'Synthetic persona simulator integration',
        'Dedicated 99.9% SLA & priority support',
      ],
      popular: true,
      cta: 'Upgrade to Pro Evolution',
    },
    {
      name: 'Enterprise Matrix',
      price: 'Custom',
      period: '',
      description: 'Custom governance rules, dedicated CI/CD runner clusters.',
      features: [
        'Everything in Pro + custom LLM models',
        'Multi-tenant admin approval policies',
        'SOC2 Type II & HIPAA audit logs',
        'Self-hosted sandbox runners',
        'Dedicated Solutions Architect',
      ],
      popular: false,
      cta: 'Contact Sales Team',
    },
  ];

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto" data-component-id="PricingPage.tsx">
      
      {/* State banner */}
      {isHighContrast ? (
        <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 max-w-xl mx-auto">
          <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span><strong>UI Evolved:</strong> 7.2:1 WCAG AAA Compliant Text Contrast & Vibrant Accents</span>
        </div>
      ) : (
        <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs flex items-center gap-2 max-w-xl mx-auto">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span><strong>Baseline UI:</strong> Muted low-contrast text on dark backgrounds (2.8:1 ratio)</span>
        </div>
      )}

      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          Continuous UI Evolution at Scale
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400">
          Turn continuous customer feedback into safe, admin-approved frontend deployments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            data-element-selector={`#pricing-card-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
              tier.popular
                ? 'glass-card border-indigo-500/50 shadow-2xl shadow-indigo-500/10 scale-105 z-10'
                : 'glass-card border-white/10 hover:border-white/20'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Badge variant="primary" size="sm" dot className="shadow-lg">
                  Most Popular
                </Badge>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-display text-white">{tier.name}</h3>
                {tier.popular && <Zap className="w-5 h-5 text-indigo-400" />}
              </div>
              <p className="mt-2 text-xs text-slate-400 min-h-[36px]">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black font-display text-white">{tier.price}</span>
                <span className="text-xs text-slate-400">{tier.period}</span>
              </div>

              {/* Feature list with contrast toggle */}
              <div className="mt-8 space-y-3">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Features included:</p>
                {tier.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className={`p-0.5 rounded-full mt-0.5 flex-shrink-0 ${isHighContrast ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {/* Contrast change applied here! */}
                    <span className={`text-xs ${isHighContrast ? 'text-slate-100 font-medium' : 'text-slate-500 font-normal'}`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
