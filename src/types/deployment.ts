export interface DeploymentVersion {
  version: string;
  deployedAt: string;
  deployedBy: string;
  proposalId: string;
  feedbackId: string;
  commitHash: string;
  changeSummary: string;
  affectedComponents: string[];
  appliedPatchesCount: number;
  status: 'active-production' | 'superseded' | 'rolled-back';
  rollbackTargetVersion?: string;
  metrics: {
    userSatisfactionRating: number;
    errorRate: number;
    conversionDelta: string;
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: 'FEEDBACK_SUBMITTED' | 'AI_ANALYSIS_COMPLETED' | 'PROPOSAL_GENERATED' | 'ADMIN_APPROVED' | 'ADMIN_REJECTED' | 'TEST_PIPELINE_PASSED' | 'DEPLOYED_TO_PROD' | 'ROLLED_BACK';
  details: string;
  metadata: {
    feedbackId?: string;
    proposalId?: string;
    version?: string;
    notes?: string;
  };
}
