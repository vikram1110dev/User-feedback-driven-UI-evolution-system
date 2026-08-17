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
    <div className="py-6 px-3 sm:px-6 max-w-6xl mx-auto" data-component-id="PricingPage.tsx">
      
      {/* State banner */}
      {isHighContrast ? (
        <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center gap-3 max-w-xl mx-auto shadow-xs">
          <div className="p-1.5 rounded-xl bg-emerald-200/70 text-emerald-800 flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-sm">UI Evolved: 7.2:1 WCAG AAA Contrast Rating</span>
            <span className="text-xs text-emerald-700">High-luminosity feature text tokens & vibrant status badges</span>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-3 max-w-xl mx-auto shadow-xs">
          <div className="p-1.5 rounded-xl bg-amber-200/70 text-amber-800 flex-shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-sm">Baseline UI: Low Contrast Ratio (2.8:1)</span>
            <span className="text-xs text-amber-700">Muted grey text on dark navy cards fails WCAG AA</span>
          </div>
        </div>
      )}

      {/* Header & Annual Toggle */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
          Continuous UI Evolution at Scale
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
          Transform real customer feedback into safe, admin-approved production UI deployments.
        </p>

        {/* Billing Switch */}
        <div className="mt-6 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-200/70 border border-slate-300 text-sm font-semibold">
          <button
            onClick={() => setAnnualBilling(false)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${!annualBilling ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'}`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnualBilling(true)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${annualBilling ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'}`}
          >
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">20% OFF</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            data-element-selector={`#pricing-card-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
            className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
              tier.popular
                ? 'bg-white border-2 border-teal-600 shadow-xl shadow-teal-600/10 md:-translate-y-2'
                : 'bg-white border border-slate-200 shadow-md hover:border-slate-300'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge variant="teal" size="md" dot className="shadow-md font-bold px-4 py-1.5">
                  Recommended Tier
                </Badge>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-display text-slate-900">{tier.name}</h3>
                {tier.popular && <Zap className="w-5 h-5 text-teal-600" />}
              </div>
              <p className="mt-2 text-sm text-slate-500 min-h-[40px] leading-relaxed">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black font-display text-slate-900 tracking-tight">{tier.price}</span>
                <span className="text-sm font-semibold text-slate-500">{tier.period}</span>
              </div>

              {/* Feature list */}
              <div className="mt-8 space-y-3.5">
                <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Features Included:</p>
                {tier.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <div className={`p-1 rounded-full mt-0.5 flex-shrink-0 ${isHighContrast ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {/* Contrast change */}
                    <span className={`text-sm leading-relaxed ${isHighContrast ? 'text-slate-900 font-semibold' : 'text-slate-400 font-normal'}`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                className={`w-full py-3.5 px-5 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  tier.popular
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-600/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'
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
