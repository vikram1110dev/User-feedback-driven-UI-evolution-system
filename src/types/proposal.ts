import { FeedbackCategory, FeedbackSeverity } from './feedback';

export type ProposalStatus = 
  | 'draft' 
  | 'pending-admin-review' 
  | 'admin-approved' 
  | 'admin-rejected' 
  | 'modifications-requested' 
  | 'in-pipeline' 
  | 'ready-to-deploy' 
  | 'deployed' 
  | 'rolled-back';

export interface CodeDiffLine {
  type: 'added' | 'removed' | 'context';
  lineNo: number;
  content: string;
}

export interface ComponentPatch {
  filePath: string;
  componentName: string;
  summary: string;
  diffLines: CodeDiffLine[];
  originalSnippet: string;
  proposedSnippet: string;
  cssTokenOverrides?: Record<string, string>;
}

export interface UIChangeProposal {
  id: string;
  feedbackId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  problemSummary: string;
  rootCauseAnalysis: string;
  category: FeedbackCategory;
  priority: FeedbackSeverity;
  affectedPage: string;
  affectedComponents: string[];
  suggestedSolution: string;
  patches: ComponentPatch[];
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    riskFactors: string[];
    mitigationStrategy: string;
  };
  expectedImpact: {
    uxImprovement: string;
    targetMetrics: string[];
    accessibilityScoreDelta: number; // e.g. +14%
  };
  status: ProposalStatus;
  adminDecision?: {
    decidedAt: string;
    decidedBy: string;
    action: 'approved' | 'rejected' | 'requested-changes';
    adminNotes?: string;
  };
  validationResult?: {
    passed: boolean;
    testsRun: number;
    testsPassed: number;
    timestamp: string;
  };
  deploymentVersion?: string; // e.g. 'v1.1.0'
}
