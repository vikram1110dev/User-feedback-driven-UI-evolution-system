import React, { useState } from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Lock, Mail, ArrowRight, Shield, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({ flags }) => {
  const [email, setEmail] = useState('alex.morgan@enterprise.co');
  const [password, setPassword] = useState('••••••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const isOptimized = flags.loginMobileOptimized;

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto py-6 sm:py-10 px-3 sm:px-6" data-component-id="LoginPage.tsx">
      
      {/* State banner indicator */}
      {isOptimized ? (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center gap-3 animate-fade-in shadow-xs">
          <div className="p-1.5 rounded-xl bg-emerald-200/70 text-emerald-800 flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-sm">UI Evolved: Responsive CTA Active</span>
            <span className="text-xs text-emerald-700">48px minimum touch target & full-width flex scaling</span>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-3 shadow-xs">
          <div className="p-1.5 rounded-xl bg-amber-200/70 text-amber-800 flex-shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-sm">Baseline UI: Non-Responsive CTA</span>
            <span className="text-xs text-amber-700">Fixed small dimensions prone to mobile tap failures</span>
          </div>
        </div>
      )}

      <div 
        className="pro-card p-8 sm:p-10 rounded-3xl relative overflow-hidden transition-all duration-300 shadow-lg border border-slate-200"
        data-element-selector="#login-auth-card"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 p-0.5 mx-auto mb-4 shadow-md shadow-teal-500/25">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-teal-600">
              <Shield className="w-7 h-7" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">Enterprise Sign In</h2>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">Authenticate to access your UI evolution cluster</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              Work Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#forgot" className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span>Remember this session (30 days)</span>
            </label>
          </div>

          {/* CTA Button that dynamically evolves */}
          <div className="pt-2" data-element-selector="#login-cta-button">
            {isOptimized ? (
              // EVOLVED: High contrast teal gradient, 52px touch target, flex width, larger text & icon
              <button
                type="submit"
                id="login-cta-button"
                className="w-full px-6 py-3.5 sm:py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-600/30 min-h-[52px] flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base cursor-pointer"
              >
                <span>Sign In to Cluster</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              // BASELINE: Small, low padding button
              <button
                type="submit"
                id="login-cta-button"
                className="px-4 py-2 bg-slate-700 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

        </form>

        <div className="mt-8 pt-5 border-t border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Protected with TLS 1.3 & FIPS-compliant encryption</span>
        </div>
      </div>
    </div>
  );
};
