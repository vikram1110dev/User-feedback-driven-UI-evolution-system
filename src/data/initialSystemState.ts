import { DeploymentVersion, AuditLogEntry } from '../types/deployment';

export const INITIAL_DEPLOYMENTS: DeploymentVersion[] = [
  {
    version: 'v1.0.0',
    deployedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    deployedBy: 'System Administrator (Initial Release)',
    proposalId: 'prop-baseline',
    feedbackId: 'fb-initial-foundation',
    commitHash: '7a91f3c',
    changeSummary: 'Baseline production release of multi-page SaaS application',
    affectedComponents: ['HeroLandingPage.tsx', 'LoginPage.tsx', 'PricingPage.tsx', 'DashboardPage.tsx'],
    appliedPatchesCount: 0,
    status: 'active-production',
    metrics: {
      userSatisfactionRating: 3.8,
      errorRate: 0.04,
      conversionDelta: '+0.0%'
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-001',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    actor: 'System Admin',
    action: 'DEPLOYED_TO_PROD',
    details: 'Initial production baseline v1.0.0 deployed with standard UI components',
    metadata: {
      version: 'v1.0.0',
      notes: 'Initial production release'
    }
  }
];
