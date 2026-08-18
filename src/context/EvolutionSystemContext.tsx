import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserFeedback, DeviceContext, PinLocation } from '../types/feedback';
import { UIChangeProposal } from '../types/proposal';
import { PipelineRun } from '../types/pipeline';
import { DeploymentVersion, AuditLogEntry } from '../types/deployment';
import { createProposalFromFeedback, createProposalFromFeedbackAsync } from '../engine/proposalEngine';
import { runAutomatedPipeline } from '../engine/automatedTester';
import { INITIAL_DEPLOYMENTS, INITIAL_AUDIT_LOGS } from '../data/initialSystemState';
import { SYNTHETIC_PERSONA_SCENARIOS, generateSyntheticFeedback } from '../engine/syntheticFeedback';
import { reSynthesizeProposalWithCustomPrompt } from '../engine/geminiService';

export type ActiveAppView = 'target-app' | 'admin-studio' | 'live-preview-split' | 'pipeline-console' | 'audit-traceability';
export type TargetAppPage = 'hero' | 'login' | 'pricing' | 'dashboard' | 'settings';

export interface EvolutionFlags {
  loginMobileOptimized: boolean;
  pricingHighContrast: boolean;
  heroDynamicCTA: boolean;
  dashboardComfortDensity: boolean;
}

const STORAGE_KEYS = {
  FEEDBACKS: 'evolvui_feedbacks_v1',
  PROPOSALS: 'evolvui_proposals_v1',
  DEPLOYMENTS: 'evolvui_deployments_v1',
  AUDIT_LOGS: 'evolvui_audit_logs_v1',
  PROD_FLAGS: 'evolvui_prod_flags_v1',
  STAGING_FLAGS: 'evolvui_staging_flags_v1',
  PROD_VERSION: 'evolvui_prod_version_v1',
  GEMINI_API_KEY: 'evolvui_gemini_api_key_v1',
  GEMINI_MODEL: 'evolvui_gemini_model_v1',
};

const DEFAULT_FLAGS: EvolutionFlags = {
  loginMobileOptimized: false,
  pricingHighContrast: false,
  heroDynamicCTA: false,
  dashboardComfortDensity: false,
};

function getInitialInitialSeed() {
  const scenario = SYNTHETIC_PERSONA_SCENARIOS[0];
  const fb = generateSyntheticFeedback(scenario);
  const prop = createProposalFromFeedback(fb);
  fb.proposalId = prop.id;
  return { fb, prop };
}

interface EvolutionSystemContextType {
  // Navigation & View Modes
  activeView: ActiveAppView;
  setActiveView: (view: ActiveAppView) => void;
  currentPage: TargetAppPage;
  setCurrentPage: (page: TargetAppPage) => void;
  deviceMode: DeviceContext;
  setDeviceMode: (device: DeviceContext) => void;

  // In-App Feedback Widget State
  isFeedbackModeActive: boolean;
  setIsFeedbackModeActive: (active: boolean) => void;
  isPinDropModeActive: boolean;
  setIsPinDropModeActive: (active: boolean) => void;
  selectedElementSelector: string | null;
  setSelectedElementSelector: (selector: string | null) => void;
  currentPinLocation: PinLocation | null;
  setCurrentPinLocation: (pin: PinLocation | null) => void;

  // Core Data
  feedbacks: UserFeedback[];
  proposals: UIChangeProposal[];
  activeProposal: UIChangeProposal | null;
  setActiveProposal: (prop: UIChangeProposal | null) => void;
  pipelineRun: PipelineRun | null;
  deployments: DeploymentVersion[];
  currentProdVersion: string;
  auditLogs: AuditLogEntry[];
  
  // Dynamic Evolution Feature Flags for Target App (Prod vs Staging)
  prodEvolutionFlags: EvolutionFlags;
  stagingEvolutionFlags: EvolutionFlags;

  // AI API Configuration
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  isGeneratingProposal: boolean;

  // Actions
  submitUserFeedback: (feedbackData: Partial<UserFeedback>) => Promise<UserFeedback>;
  triggerSyntheticScenario: (scenarioId: string) => Promise<void>;
  approveProposal: (proposalId: string, adminNotes?: string) => Promise<void>;
  rejectProposal: (proposalId: string, adminNotes?: string) => void;
  requestProposalModifications: (proposalId: string, adminNotes?: string) => void;
  reSynthesizeProposalWithPrompt: (proposalId: string, customInstruction: string) => Promise<void>;
  startAutomatedTesting: (proposalId: string) => Promise<void>;
  deployProposalToProd: (proposalId: string) => Promise<void>;
  rollbackToVersion: (version: string) => Promise<void>;
  resetToDefaults: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const EvolutionSystemContext = createContext<EvolutionSystemContextType | undefined>(undefined);

export const EvolutionSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveAppView>('target-app');
  const [currentPage, setCurrentPage] = useState<TargetAppPage>('login');
  const [deviceMode, setDeviceMode] = useState<DeviceContext>('desktop');

  // Widget state
  const [isFeedbackModeActive, setIsFeedbackModeActive] = useState<boolean>(false);
  const [isPinDropModeActive, setIsPinDropModeActive] = useState<boolean>(false);
  const [selectedElementSelector, setSelectedElementSelector] = useState<string | null>(null);
  const [currentPinLocation, setCurrentPinLocation] = useState<PinLocation | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGeneratingProposal, setIsGeneratingProposal] = useState<boolean>(false);

  // Gemini API Configuration (loaded from LocalStorage)
  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY) || '';
  });
  const [selectedModel, setSelectedModelState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.GEMINI_MODEL) || 'gemini-2.5-flash';
  });

  const setGeminiApiKey = (key: string) => {
    setGeminiApiKeyState(key);
    localStorage.setItem(STORAGE_KEYS.GEMINI_API_KEY, key);
  };

  const setSelectedModel = (model: string) => {
    setSelectedModelState(model);
    localStorage.setItem(STORAGE_KEYS.GEMINI_MODEL, model);
  };

  // Entities with LocalStorage Persistence
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved feedbacks:', e);
    }
    const seed = getInitialInitialSeed();
    return [seed.fb];
  });

  const [proposals, setProposals] = useState<UIChangeProposal[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved proposals:', e);
    }
    const seed = getInitialInitialSeed();
    return [seed.prop];
  });

  const [activeProposal, setActiveProposal] = useState<UIChangeProposal | null>(() => {
    return proposals[0] || null;
  });

  const [pipelineRun, setPipelineRun] = useState<PipelineRun | null>(null);

  const [deployments, setDeployments] = useState<DeploymentVersion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEPLOYMENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved deployments:', e);
    }
    return INITIAL_DEPLOYMENTS;
  });

  const [currentProdVersion, setCurrentProdVersion] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.PROD_VERSION) || 'v1.0.0';
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved audit logs:', e);
    }
    return INITIAL_AUDIT_LOGS;
  });

  // Evolution Flags with LocalStorage Persistence
  const [prodEvolutionFlags, setProdEvolutionFlags] = useState<EvolutionFlags>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROD_FLAGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved prod flags:', e);
    }
    return DEFAULT_FLAGS;
  });

  const [stagingEvolutionFlags, setStagingEvolutionFlags] = useState<EvolutionFlags>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STAGING_FLAGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved staging flags:', e);
    }
    return DEFAULT_FLAGS;
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEPLOYMENTS, JSON.stringify(deployments));
  }, [deployments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROD_FLAGS, JSON.stringify(prodEvolutionFlags));
  }, [prodEvolutionFlags]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STAGING_FLAGS, JSON.stringify(stagingEvolutionFlags));
  }, [stagingEvolutionFlags]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROD_VERSION, currentProdVersion);
  }, [currentProdVersion]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addAuditLog = (action: AuditLogEntry['action'], details: string, metadata: AuditLogEntry['metadata'] = {}) => {
    const newLog: AuditLogEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      timestamp: new Date().toISOString(),
      actor: 'Admin / System Engine',
      action,
      details,
      metadata,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Helper to map proposal to evolution flag
  const applyFlagsForProposal = (prop: UIChangeProposal, isStaging: boolean) => {
    const setter = isStaging ? setStagingEvolutionFlags : setProdEvolutionFlags;
    setter(prev => {
      const next = { ...prev };
      if (prop.affectedPage === 'login') next.loginMobileOptimized = true;
      if (prop.affectedPage === 'pricing') next.pricingHighContrast = true;
      if (prop.affectedPage === 'hero') next.heroDynamicCTA = true;
      if (prop.affectedPage === 'dashboard') next.dashboardComfortDensity = true;
      return next;
    });
  };

  // 1. Submit Feedback with Live Gemini AI Integration
  const submitUserFeedback = async (feedbackData: Partial<UserFeedback>): Promise<UserFeedback> => {
    setIsGeneratingProposal(true);

    const newFb: UserFeedback = {
      id: `fb-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      author: feedbackData.author || { name: 'Customer User', role: 'End User' },
      category: feedbackData.category || 'ui-issue',
      title: feedbackData.title || 'User interface feedback',
      description: feedbackData.description || '',
      targetPage: feedbackData.targetPage || currentPage,
      targetComponent: feedbackData.targetComponent,
      targetElementSelector: selectedElementSelector || feedbackData.targetElementSelector,
      pinLocation: currentPinLocation || feedbackData.pinLocation,
      deviceContext: deviceMode,
      rating: feedbackData.rating || 3,
      sentiment: feedbackData.sentiment || 'neutral',
      status: 'analyzed',
    };

    try {
      // Async generation with Gemini or Fallback
      const { proposal, isAIGenerated } = await createProposalFromFeedbackAsync(
        newFb,
        geminiApiKey,
        selectedModel
      );

      newFb.proposalId = proposal.id;
      newFb.status = 'proposal-created';

      setFeedbacks(prev => [newFb, ...prev]);
      setProposals(prev => [proposal, ...prev]);
      setActiveProposal(proposal);

      // Reset feedback UI pins/selectors
      setIsFeedbackModeActive(false);
      setIsPinDropModeActive(false);
      setSelectedElementSelector(null);
      setCurrentPinLocation(null);

      addAuditLog('FEEDBACK_SUBMITTED', `Feedback submitted: "${newFb.title}" for ${newFb.targetPage}`, { feedbackId: newFb.id });
      
      if (isAIGenerated) {
        addAuditLog('PROPOSAL_GENERATED', `Google Gemini (${selectedModel}) synthesized Change Proposal "${proposal.title}" (Priority: ${proposal.priority.toUpperCase()})`, { proposalId: proposal.id });
        showToast(`⚡ Live Gemini AI generated Proposal #${proposal.id.slice(-6)}! Ready for Admin Review.`);
      } else {
        addAuditLog('PROPOSAL_GENERATED', `Autonomous Engine generated Change Proposal "${proposal.title}" (Priority: ${proposal.priority.toUpperCase()})`, { proposalId: proposal.id });
        showToast(`AI generated Proposal #${proposal.id.slice(-6)} for Admin review.`);
      }

      return newFb;
    } finally {
      setIsGeneratingProposal(false);
    }
  };

  // 2. Trigger synthetic scenario
  const triggerSyntheticScenario = async (scenarioId: string) => {
    const scenario = SYNTHETIC_PERSONA_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return;

    setCurrentPage(scenario.targetPage as TargetAppPage);
    setDeviceMode(scenario.deviceContext);

    const syntheticFb = generateSyntheticFeedback(scenario);
    await submitUserFeedback(syntheticFb);
  };

  // 3. Admin: Approve Proposal
  const approveProposal = async (proposalId: string, adminNotes?: string) => {
    const prop = proposals.find(p => p.id === proposalId);
    if (!prop) return;

    const updatedProp: UIChangeProposal = {
      ...prop,
      status: 'admin-approved',
      updatedAt: new Date().toISOString(),
      adminDecision: {
        decidedAt: new Date().toISOString(),
        decidedBy: 'Lead Administrator',
        action: 'approved',
        adminNotes: adminNotes || 'Approved proposed frontend modifications for automated pipeline test execution.',
      }
    };

    setProposals(prev => prev.map(p => p.id === proposalId ? updatedProp : p));
    setFeedbacks(prev => prev.map(f => f.id === prop.feedbackId ? { ...f, status: 'approved' } : f));
    setActiveProposal(updatedProp);

    addAuditLog('ADMIN_APPROVED', `Admin approved proposal #${proposalId.slice(-6)}. Notes: ${adminNotes || 'None'}`, { proposalId });
    showToast(`Proposal approved! Starting Automated Testing Pipeline...`);

    // Automatically trigger test pipeline
    await startAutomatedTesting(proposalId);
  };

  // 4. Admin: Reject Proposal
  const rejectProposal = (proposalId: string, adminNotes?: string) => {
    const prop = proposals.find(p => p.id === proposalId);
    if (!prop) return;

    const updatedProp: UIChangeProposal = {
      ...prop,
      status: 'admin-rejected',
      updatedAt: new Date().toISOString(),
      adminDecision: {
        decidedAt: new Date().toISOString(),
        decidedBy: 'Lead Administrator',
        action: 'rejected',
        adminNotes: adminNotes || 'Proposal does not align with current design roadmap.',
      }
    };

    setProposals(prev => prev.map(p => p.id === proposalId ? updatedProp : p));
    setFeedbacks(prev => prev.map(f => f.id === prop.feedbackId ? { ...f, status: 'rejected' } : f));
    setActiveProposal(updatedProp);

    addAuditLog('ADMIN_REJECTED', `Admin rejected proposal #${proposalId.slice(-6)}: ${adminNotes || 'No notes provided'}`, { proposalId });
    showToast(`Proposal #${proposalId.slice(-6)} rejected.`);
  };

  // 5. Admin: Request Modifications
  const requestProposalModifications = (proposalId: string, adminNotes?: string) => {
    const prop = proposals.find(p => p.id === proposalId);
    if (!prop) return;

    const updatedProp: UIChangeProposal = {
      ...prop,
      status: 'modifications-requested',
      updatedAt: new Date().toISOString(),
      adminDecision: {
        decidedAt: new Date().toISOString(),
        decidedBy: 'Lead Administrator',
        action: 'requested-changes',
        adminNotes: adminNotes || 'Please adjust the color scheme tokens to maintain brand gradient harmony.',
      }
    };

    setProposals(prev => prev.map(p => p.id === proposalId ? updatedProp : p));
    setActiveProposal(updatedProp);

    addAuditLog('FEEDBACK_SUBMITTED', `Admin requested modifications on #${proposalId.slice(-6)}: ${adminNotes}`, { proposalId });
    showToast(`Requested modifications for Proposal #${proposalId.slice(-6)}.`);
  };

  // 5b. Admin: Re-Synthesize Proposal with Custom Prompt
  const reSynthesizeProposalWithPrompt = async (proposalId: string, customInstruction: string) => {
    const prop = proposals.find(p => p.id === proposalId) || activeProposal;
    if (!prop || !customInstruction.trim()) return;

    setIsGeneratingProposal(true);
    try {
      const refined = await reSynthesizeProposalWithCustomPrompt(
        prop,
        customInstruction,
        geminiApiKey,
        selectedModel
      );

      setProposals(prev => prev.map(p => p.id === proposalId ? refined : p));
      setActiveProposal(refined);

      addAuditLog('PROPOSAL_GENERATED', `AI re-synthesized Proposal #${proposalId.slice(-6)}: "${customInstruction.slice(0, 45)}..."`, { proposalId });
      showToast(`✨ Re-synthesized Proposal #${proposalId.slice(-6)} with custom directives!`);
    } finally {
      setIsGeneratingProposal(false);
    }
  };

  // 6. Automated Testing Pipeline
  const startAutomatedTesting = async (proposalId: string) => {
    const prop = proposals.find(p => p.id === proposalId) || activeProposal;
    if (!prop) return;

    setActiveView('pipeline-console');

    // Run test runner
    const completedRun = await runAutomatedPipeline(prop, (progressRun) => {
      setPipelineRun({ ...progressRun });
    });

    if (completedRun.status === 'success') {
      const readyProp: UIChangeProposal = {
        ...prop,
        status: 'ready-to-deploy',
        updatedAt: new Date().toISOString(),
        validationResult: {
          passed: true,
          testsRun: completedRun.testCases.length,
          testsPassed: completedRun.testCases.length,
          timestamp: completedRun.completedAt || new Date().toISOString(),
        }
      };

      setProposals(prev => prev.map(p => p.id === proposalId ? readyProp : p));
      setActiveProposal(readyProp);

      // Apply to Staging flags for live split preview
      applyFlagsForProposal(readyProp, true);

      addAuditLog('TEST_PIPELINE_PASSED', `Automated pipeline passed 5/5 tests for staging branch (Proposal #${proposalId.slice(-6)})`, { proposalId });
      showToast(`Automated tests passed! Staging preview ready for deployment.`);
    }
  };

  // 7. One-Click Deploy to Production
  const deployProposalToProd = async (proposalId: string) => {
    const prop = proposals.find(p => p.id === proposalId) || activeProposal;
    if (!prop) return;

    const versionNumber = `v1.${deployments.length}.0`;
    const newDeployment: DeploymentVersion = {
      version: versionNumber,
      deployedAt: new Date().toISOString(),
      deployedBy: 'Lead Administrator',
      proposalId: prop.id,
      feedbackId: prop.feedbackId,
      commitHash: Math.random().toString(16).substring(2, 9),
      changeSummary: prop.suggestedSolution,
      affectedComponents: prop.affectedComponents,
      appliedPatchesCount: prop.patches.length,
      status: 'active-production',
      metrics: {
        userSatisfactionRating: 4.8,
        errorRate: 0.002,
        conversionDelta: `+${(Math.random() * 10 + 12).toFixed(1)}%`
      }
    };

    // Update previous deployments to superseded
    setDeployments(prev => [newDeployment, ...prev.map(d => ({ ...d, status: 'superseded' as const }))]);
    setCurrentProdVersion(versionNumber);

    // Apply flags to Production
    applyFlagsForProposal(prop, false);

    // Update proposal & feedback status
    const deployedProp: UIChangeProposal = {
      ...prop,
      status: 'deployed',
      deploymentVersion: versionNumber,
      updatedAt: new Date().toISOString(),
    };
    setProposals(prev => prev.map(p => p.id === proposalId ? deployedProp : p));
    setFeedbacks(prev => prev.map(f => f.id === prop.feedbackId ? { ...f, status: 'deployed' } : f));
    setActiveProposal(deployedProp);

    addAuditLog('DEPLOYED_TO_PROD', `Deployed ${versionNumber} to production: ${prop.suggestedSolution}`, { proposalId, version: versionNumber });
    showToast(`🚀 Deployed ${versionNumber} to Production! Live application UI evolved.`);
  };

  // 8. Rollback to Version
  const rollbackToVersion = async (targetVersion: string) => {
    const target = deployments.find(d => d.version === targetVersion);
    if (!target) return;

    if (targetVersion === 'v1.0.0') {
      // Revert all flags
      setProdEvolutionFlags(DEFAULT_FLAGS);
    }

    setCurrentProdVersion(targetVersion);
    setDeployments(prev => prev.map(d => ({
      ...d,
      status: d.version === targetVersion ? 'active-production' : 'rolled-back'
    })));

    addAuditLog('ROLLED_BACK', `Rolled back production release to ${targetVersion}`, { version: targetVersion });
    showToast(`⏮️ Successfully rolled back to ${targetVersion}. Production UI restored.`);
  };

  // 9. Reset to Factory Defaults
  const resetToDefaults = () => {
    const seed = getInitialInitialSeed();
    setFeedbacks([seed.fb]);
    setProposals([seed.prop]);
    setActiveProposal(seed.prop);
    setDeployments(INITIAL_DEPLOYMENTS);
    setCurrentProdVersion('v1.0.0');
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setProdEvolutionFlags(DEFAULT_FLAGS);
    setStagingEvolutionFlags(DEFAULT_FLAGS);

    localStorage.removeItem(STORAGE_KEYS.FEEDBACKS);
    localStorage.removeItem(STORAGE_KEYS.PROPOSALS);
    localStorage.removeItem(STORAGE_KEYS.DEPLOYMENTS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    localStorage.removeItem(STORAGE_KEYS.PROD_FLAGS);
    localStorage.removeItem(STORAGE_KEYS.STAGING_FLAGS);
    localStorage.removeItem(STORAGE_KEYS.PROD_VERSION);

    showToast('✨ System restored to factory defaults and clean demo baseline.');
  };

  return (
    <EvolutionSystemContext.Provider
      value={{
        activeView,
        setActiveView,
        currentPage,
        setCurrentPage,
        deviceMode,
        setDeviceMode,
        isFeedbackModeActive,
        setIsFeedbackModeActive,
        isPinDropModeActive,
        setIsPinDropModeActive,
        selectedElementSelector,
        setSelectedElementSelector,
        currentPinLocation,
        setCurrentPinLocation,
        feedbacks,
        proposals,
        activeProposal,
        setActiveProposal,
        pipelineRun,
        deployments,
        currentProdVersion,
        auditLogs,
        prodEvolutionFlags,
        stagingEvolutionFlags,
        geminiApiKey,
        setGeminiApiKey,
        selectedModel,
        setSelectedModel,
        isGeneratingProposal,
        submitUserFeedback,
        triggerSyntheticScenario,
        approveProposal,
        rejectProposal,
        requestProposalModifications,
        reSynthesizeProposalWithPrompt,
        startAutomatedTesting,
        deployProposalToProd,
        rollbackToVersion,
        resetToDefaults,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </EvolutionSystemContext.Provider>
  );
};

export const useEvolutionSystem = () => {
  const context = useContext(EvolutionSystemContext);
  if (!context) {
    throw new Error('useEvolutionSystem must be used within an EvolutionSystemProvider');
  }
  return context;
};
