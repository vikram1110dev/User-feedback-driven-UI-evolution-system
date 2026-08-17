import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'cyan' | 'neutral' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'teal',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const variantStyles = {
    teal: 'bg-teal-50 text-teal-800 border-teal-200 font-semibold',
    primary: 'bg-teal-100/70 text-teal-900 border-teal-300 font-semibold',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
    warning: 'bg-amber-50 text-amber-900 border-amber-200 font-semibold',
    danger: 'bg-rose-50 text-rose-800 border-rose-200 font-semibold',
    purple: 'bg-purple-50 text-purple-800 border-purple-200 font-semibold',
    cyan: 'bg-cyan-50 text-cyan-800 border-cyan-200 font-semibold',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
  };

  const dotColors = {
    teal: 'bg-teal-500',
    primary: 'bg-teal-600',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    neutral: 'bg-slate-500',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border shadow-2xs transition-all ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`w-2 h-2 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
