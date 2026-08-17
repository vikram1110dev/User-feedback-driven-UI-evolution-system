import React, { useState } from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Lock, Mail, ArrowRight, Shield, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({ flags, isStagingPreview = false }) => {
  const [email, setEmail] = useState('developer@company.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const isOptimized = flags.loginMobileOptimized;

  return (
    <div className="w-full max-w-md mx-auto py-8 px-4" data-component-id="LoginPage.tsx">
      
      {/* State banner indicator */}
      {isOptimized ? (
        <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span><strong>UI Evolved:</strong> Mobile 48px Touch Target & Flex Width Active</span>
        </div>
      ) : (
        <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span><strong>Baseline UI:</strong> Fixed CTA sizing on compact screens</span>
        </div>
      )}

      <div 
        className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl transition-all duration-300"
        data-element-selector="#login-auth-card"
      >
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white tracking-tight">Welcome back</h2>
          <p className="text-sm text-slate-400 mt-1">Sign in to manage your autonomous UI evolution workflows</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Work Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <a href="#forgot" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-white/20 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950"
              />
              <span>Remember this device for 30 days</span>
            </label>
          </div>

          {/* Target Button that gets evolved */}
          <div className="pt-2" data-element-selector="#login-cta-button">
            {isOptimized ? (
              // EVOLVED STATE: Full width mobile flex, 48px touch target, gradient, icon, micro-animations
              <button
                type="submit"
                id="login-cta-button"
                className="w-full px-6 py-3.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-600 hover:from-indigo-600 hover:to-cyan-700 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/25 min-h-[48px] flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              // BASELINE UNOPTIMIZED STATE: Small fixed button, low contrast, no touch target padding
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

        <div className="mt-6 pt-6 border-t border-white/5 text-center text-xs text-slate-500">
          <span>Protected with 256-bit automated encryption token</span>
        </div>
      </div>
    </div>
  );
};
