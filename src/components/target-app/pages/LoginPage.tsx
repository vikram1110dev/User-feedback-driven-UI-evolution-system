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
    <div className="w-full max-w-sm sm:max-w-md mx-auto py-4 sm:py-8 px-2 sm:px-4" data-component-id="LoginPage.tsx">
      
      {/* State banner indicator */}
      {isOptimized ? (
        <div className="mb-5 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-fade-in shadow-lg shadow-emerald-500/5">
          <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold block">UI Evolved: Responsive CTA Active</span>
            <span className="text-[11px] text-emerald-400/80">48px minimum touch target & full-width flex scaling</span>
          </div>
        </div>
      ) : (
        <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs flex items-center gap-2.5">
          <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 flex-shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold block">Baseline UI: Non-Responsive CTA</span>
            <span className="text-[11px] text-amber-300/70">Fixed dimensions prone to mobile tap failures</span>
          </div>
        </div>
      )}

      <div 
        className="pro-card p-6 sm:p-8 rounded-3xl relative overflow-hidden transition-all duration-300"
        data-element-selector="#login-auth-card"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 mx-auto mb-3 shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0d1322] rounded-[14px] flex items-center justify-center text-indigo-400">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">Enterprise Sign In</h2>
          <p className="text-xs text-slate-400 mt-1">Authenticate to access your UI evolution cluster</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Work Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <a href="#forgot" className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-slate-900 border-white/20 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Remember session (30d)</span>
            </label>
          </div>

          {/* CTA Button that dynamically evolves */}
          <div className="pt-2" data-element-selector="#login-cta-button">
            {isOptimized ? (
              // EVOLVED: High contrast, 48px touch target, flex width, gradient, arrow icon
              <button
                type="submit"
                id="login-cta-button"
                className="w-full px-5 py-3 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 min-h-[48px] flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs sm:text-sm"
              >
                <span>Sign In to Cluster</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              // BASELINE: Small, rigid button
              <button
                type="submit"
                id="login-cta-button"
                className="px-3 py-1.5 bg-indigo-700 text-slate-200 text-xs font-medium rounded hover:bg-indigo-600 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

        </form>

        <div className="mt-5 pt-4 border-t border-white/[0.06] text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Protected with TLS 1.3 & FIPS-compliant encryption</span>
        </div>
      </div>
    </div>
  );
};
