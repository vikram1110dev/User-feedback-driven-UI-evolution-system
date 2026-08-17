export type TestCaseStatus = 'idle' | 'running' | 'passed' | 'failed' | 'skipped';

export interface TestCase {
  id: string;
  name: string;
  category: 'build' | 'a11y' | 'responsive' | 'regression' | 'visual-diff';
  description: string;
  status: TestCaseStatus;
  durationMs?: number;
  details?: string;
  error?: string;
}

export interface PipelineRun {
  id: string;
  proposalId: string;
  versionTarget: string;
  startedAt: string;
  completedAt?: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  currentStepIndex: number;
  testCases: TestCase[];
  logs: string[];
}
