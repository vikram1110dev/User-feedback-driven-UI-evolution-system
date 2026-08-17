import React, { useState } from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Check, Zap, Sparkles, AlertCircle, Shield } from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface PricingPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const PricingPage: React.FC<PricingPageProps> = ({ flags }) => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const isHighContrast = flags.pricingHighContrast;

  const tiers = [
    {
      name: 'Startup',
      price: annualBilling ? '$39' : '$49',
      period: '/mo',
      description: 'Automated feedback ingestion and change governance for fast-moving product teams.',
      features: [
        'Up to 2,500 feedback submissions/mo',
        'Automatic AI intent & root cause categorization',
        'Human-in-the-Loop Admin Studio',
        'Automated responsive & lint test gates',
        'Community & standard email support',
      ],
      popular: false,
      cta: 'Start 14-Day Free Trial',
    },
    {
      name: 'Continuous Scale Pro',
      price: annualBilling ? '$119' : '$149',
      period: '/mo',
      description: 'End-to-end continuous UI evolution pipeline with synthetic user simulation & zero drift.',
      features: [
        'Unlimited feedback submissions & pins',
        'Instant AI Change Proposal synthesis',
        '5-stage automated CI/CD test gates',
        'Live side-by-side Split Preview & 1-click rollback',
        'Synthetic persona simulator integration',
        'Dedicated 99.98% SLA & priority Slack channel',
      ],
      popular: true,
      cta: 'Deploy Pro Evolution Cluster',
    },
    {
      name: 'Enterprise Grid',
      price: 'Custom',
      period: '',
      description: 'Dedicated LLM mutation models, custom security rules, and air-gapped sandboxes.',
      features: [
        'Custom fine-tuned LLM mutation models',
        'Multi-tenant approval hierarchy & RBAC',
        'Immutable SOC2 Type II & HIPAA audit logs',
        'Self-hosted staging runners',
        'Dedicated Solutions Architect & 24/7 pager',
      ],
      popular: false,
      cta: 'Schedule Executive Briefing',
    },
  ];

  return (
    <div className="py-6 px-2 sm:px-4 max-w-6xl mx-auto" data-component-id="PricingPage.tsx">
      
      {/* State banner */}
      {isHighContrast ? (
        <div className="mb-6 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 max-w-lg mx-auto shadow-md">
          <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold block">UI Evolved: 7.2:1 WCAG AAA Contrast Rating</span>
            <span className="text-[11px] text-emerald-400/80">High-luminosity feature text tokens & vibrant status badges</span>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs flex items-center gap-2.5 max-w-lg mx-auto">
          <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 flex-shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold block">Baseline UI: Low Contrast Ratio (2.8:1)</span>
            <span className="text-[11px] text-amber-300/70">Muted grey text on dark navy cards fails WCAG AA</span>
          </div>
        </div>
      )}

      {/* Header & Annual Toggle */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          Continuous UI Evolution at Scale
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Transform real customer feedback into safe, admin-approved production UI deployments.
        </p>

        {/* Billing Switch */}
        <div className="mt-5 inline-flex items-center gap-3 p-1 rounded-xl bg-slate-900/90 border border-white/10 text-xs">
          <button
            onClick={() => setAnnualBilling(false)}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${!annualBilling ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnualBilling(true)}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 ${annualBilling ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <span>Annual</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">20% OFF</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            data-element-selector={`#pricing-card-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
            className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
              tier.popular
                ? 'pro-card border-indigo-500/60 shadow-2xl shadow-indigo-500/15 md:-translate-y-1'
                : 'pro-card border-white/10 hover:border-white/20'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="primary" size="sm" dot className="shadow-md font-bold">
                  Recommended Tier
                </Badge>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-display text-white">{tier.name}</h3>
                {tier.popular && <Zap className="w-4 h-4 text-indigo-400" />}
              </div>
              <p className="mt-1.5 text-xs text-slate-400 min-h-[32px]">{tier.description}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold font-display text-white tracking-tight">{tier.price}</span>
                <span className="text-xs text-slate-400">{tier.period}</span>
              </div>

              {/* Feature list */}
              <div className="mt-6 space-y-2.5">
                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Features Included:</p>
                {tier.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <div className={`p-0.5 rounded-full mt-0.5 flex-shrink-0 ${isHighContrast ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    {/* Contrast change applied here! */}
                    <span className={`text-[11px] leading-relaxed ${isHighContrast ? 'text-slate-100 font-medium' : 'text-slate-500 font-normal'}`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <button
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md shadow-indigo-500/25'
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
