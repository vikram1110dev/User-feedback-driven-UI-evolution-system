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
    positive: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    negative: 'text-rose-700 bg-rose-50 border-rose-200',
    neutral: 'text-slate-700 bg-slate-100 border-slate-200',
  }[deltaType];

  return (
    <div className={`p-5 sm:p-6 rounded-3xl pro-card pro-card-hover relative overflow-hidden group ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className="p-3 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200/80 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-xs">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">{value}</span>
        {delta && (
          <span className={`text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg border ${deltaColor}`}>
            {delta}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-2 text-xs sm:text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
};
