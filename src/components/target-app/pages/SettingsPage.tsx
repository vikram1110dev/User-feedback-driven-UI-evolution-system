import React, { useState } from 'react';
import { EvolutionFlags, useEvolutionSystem } from '../../../context/EvolutionSystemContext';
import { 
  Shield, 
  Key, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Database,
  Cpu
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { testGeminiApiKey } from '../../../engine/geminiService';

interface SettingsPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const SettingsPage: React.FC<SettingsPageProps> = () => {
  const { 
    geminiApiKey, 
    setGeminiApiKey, 
    selectedModel, 
    setSelectedModel, 
    feedbacks, 
    proposals, 
    deployments, 
    auditLogs, 
    resetToDefaults,
    showToast 
  } = useEvolutionSystem();

  const [inputKey, setInputKey] = useState(geminiApiKey);
  const [showKey, setShowKey] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveKey = () => {
    setGeminiApiKey(inputKey.trim());
    showToast('Gemini API settings saved to local browser storage.');
  };

  const handleTestConnection = async () => {
    setTestStatus('testing');
    setTestMessage(null);
    const res = await testGeminiApiKey(inputKey, selectedModel);
    if (res.success) {
      setTestStatus('success');
      setTestMessage(res.message);
      setGeminiApiKey(inputKey.trim());
      showToast('🎉 Connected to Google Gemini API successfully!');
    } else {
      setTestStatus('error');
      setTestMessage(res.message);
    }
  };

  const handleClearKey = () => {
    setInputKey('');
    setGeminiApiKey('');
    setTestStatus('idle');
    setTestMessage(null);
    showToast('Gemini API key cleared. Switched to Built-in Autonomous Engine.');
  };

  const handleResetBaseline = () => {
    resetToDefaults();
    setShowResetConfirm(false);
  };

  const isLiveConnected = geminiApiKey && geminiApiKey.trim().length > 0 && testStatus !== 'error';

  return (
    <div className="py-6 px-3 sm:px-6 max-w-5xl mx-auto space-y-8 animate-fade-in" data-component-id="SettingsPage.tsx">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="font-mono text-xs text-teal-800 font-extrabold uppercase bg-teal-100 px-2.5 py-0.5 rounded-md border border-teal-200">
              System Configuration
            </span>
            {isLiveConnected ? (
              <Badge variant="teal" size="sm" dot>Live Gemini AI Active</Badge>
            ) : (
              <Badge variant="purple" size="sm" dot>Autonomous Sim Engine Active</Badge>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            System & Evolution Intelligence Settings
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Configure Google Gemini API keys, LLM models, and HITL governance policies
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 cols: Google Gemini AI Configuration Card */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Google Gemini AI Engine</h3>
                <p className="text-xs text-slate-500 font-medium">Power real-time dynamic code diffs from user feedback</p>
              </div>
            </div>

            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 hover:underline"
            >
              <span>Get Free API Key</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Key Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Gemini API Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Key className="w-4 h-4" />
              </div>
              <input
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
                  title={showKey ? 'Hide key' : 'Show key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Keys are stored securely only in your local browser's <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono">localStorage</code>.
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Gemini Model Architecture
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', badge: 'Ultra Fast (Default)', latency: '~600ms' },
                { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', badge: 'Deep Reasoning', latency: '~1.8s' },
                { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', badge: 'Stable Legacy', latency: '~900ms' },
              ].map((m) => {
                const isSelected = selectedModel === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedModel(m.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50/80 border-teal-500 ring-2 ring-teal-500/20 text-teal-950'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{m.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">{m.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test Status Banner */}
          {testStatus !== 'idle' && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 animate-fade-in ${
              testStatus === 'testing'
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : testStatus === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <div className="p-1 rounded-lg flex-shrink-0 mt-0.5">
                {testStatus === 'testing' && <Cpu className="w-4 h-4 text-teal-600 animate-spin" />}
                {testStatus === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                {testStatus === 'error' && <XCircle className="w-4 h-4 text-rose-600" />}
              </div>
              <div className="flex-1">
                <span className="font-bold block">
                  {testStatus === 'testing' && 'Testing Gemini Connection...'}
                  {testStatus === 'success' && 'Google Gemini Ready'}
                  {testStatus === 'error' && 'Connection Failed'}
                </span>
                <span className="text-xs opacity-90 mt-0.5 block">{testMessage}</span>
              </div>
            </div>
          )}

          {/* Actions Button Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleTestConnection}
              loading={testStatus === 'testing'}
            >
              Test Connection & Save
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleSaveKey}
            >
              Save Key
            </Button>

            {geminiApiKey && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearKey}
                className="text-slate-500 hover:text-rose-600"
              >
                Clear Key (Use Simulated AI)
              </Button>
            )}
          </div>
        </div>

        {/* Right 5 cols: HITL Policy & Storage Card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* HITL Policy Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Governance Safeguards</h3>
                <p className="text-xs text-slate-500 font-medium">Mandatory human sign-off policies</p>
              </div>
            </div>
            
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-800 font-medium">Zero Unsupervised Deployments</span>
                <Badge variant="success" size="sm">Strict Enforced</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-800 font-medium">Minimum WCAG Contrast</span>
                <span className="font-mono text-teal-700 font-bold">4.5:1 (AA)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-800 font-medium">Pipeline Pass Threshold</span>
                <span className="font-mono text-emerald-700 font-bold">100% (5/5)</span>
              </div>
            </div>
          </div>

          {/* Local Storage & Reset Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200 flex-shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Local Persistence</h3>
                <p className="text-xs text-slate-500 font-medium">Browser memory & state manager</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px] uppercase font-bold">Feedbacks</span>
                <span className="font-mono font-bold text-sm text-slate-900">{feedbacks.length} items</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px] uppercase font-bold">Proposals</span>
                <span className="font-mono font-bold text-sm text-slate-900">{proposals.length} drafted</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px] uppercase font-bold">Deployments</span>
                <span className="font-mono font-bold text-sm text-slate-900">{deployments.length} releases</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px] uppercase font-bold">Audit Events</span>
                <span className="font-mono font-bold text-sm text-slate-900">{auditLogs.length} logs</span>
              </div>
            </div>

            <div className="pt-2">
              {showResetConfirm ? (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                  <p className="text-xs font-semibold text-rose-900">
                    Reset all stored evolutions back to initial demo seeds?
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="danger" size="sm" onClick={handleResetBaseline}>
                      Yes, Reset System
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setShowResetConfirm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 text-slate-700"
                >
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                  <span>Reset System to Factory Baseline</span>
                </Button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
