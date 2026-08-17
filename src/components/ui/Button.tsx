import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer shadow-sm';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-2 min-h-[36px]',
    md: 'text-sm sm:text-base px-5 py-2.5 sm:py-3 gap-2.5 min-h-[44px]',
    lg: 'text-base sm:text-lg px-7 py-3.5 sm:py-4 gap-3 min-h-[52px]',
  };

  const variantStyles = {
    primary: 'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20 border border-teal-600',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm hover:border-slate-400',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 border border-emerald-600',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 border border-rose-600',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 shadow-none border border-transparent',
    glass: 'bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md border border-slate-200 shadow-md',
    gradient: 'bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 hover:from-teal-700 hover:via-teal-600 hover:to-emerald-600 text-white font-bold shadow-lg shadow-teal-600/25 border border-teal-500',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
