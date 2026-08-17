import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  delta,
  deltaType = 'positive',
  icon,
  subtitle,
  className = '',
}) => {
  const deltaColor = {
    positive: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    negative: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    neutral: 'text-slate-400 bg-slate-800 border-slate-700',
  }[deltaType];

  return (
    <div className={`p-5 rounded-2xl glass-card relative overflow-hidden transition-all duration-300 hover:border-indigo-500/30 group ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2.5">
        <span className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">{value}</span>
        {delta && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${deltaColor}`}>
            {delta}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
};
