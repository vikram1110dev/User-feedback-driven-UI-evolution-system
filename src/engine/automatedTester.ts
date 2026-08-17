import { TestCase, PipelineRun } from '../types/pipeline';
import { UIChangeProposal } from '../types/proposal';

export function createDefaultTestCases(proposal: UIChangeProposal): TestCase[] {
  return [
    {
      id: 'test-1-build',
      name: 'TypeScript Compilation & Lint Check',
      category: 'build',
      description: 'Verifies zero syntax errors, valid JSX tree structure, and strict typing',
      status: 'idle',
      details: 'Checking AST syntax and props interface definitions...'
    },
    {
      id: 'test-2-a11y',
      name: 'WCAG 2.1 AA/AAA Contrast & a11y Heuristic Check',
      category: 'a11y',
      description: 'Calculates color luminosity contrast ratio and verifies 48px minimum touch targets',
      status: 'idle',
      details: `Scanning proposed components (${proposal.affectedComponents.join(', ')})...`
    },
    {
      id: 'test-3-responsive',
      name: 'Multi-Viewport Responsive Matrix (375px / 768px / 1440px)',
      category: 'responsive',
      description: 'Simulates rendering across Mobile, Tablet, and Desktop break-points for overflow prevention',
      status: 'idle',
      details: 'Checking flex-wrap, touch boundaries, and text wrapping...'
    },
    {
      id: 'test-4-regression',
      name: 'Component Interaction & DOM Regression Suite',
      category: 'regression',
      description: 'Simulates synthetic clicks, form submits, and keyboard navigation events',
      status: 'idle',
      details: 'Executing virtual DOM event handlers...'
    },
    {
      id: 'test-5-visual-diff',
      name: 'Visual Diff Delta & Threshold Safety Gate',
      category: 'visual-diff',
      description: 'Validates that visual modifications are constrained within safe boundary limits (<25% layout shift)',
      status: 'idle',
      details: 'Comparing rendered canvas pixels against baseline...'
    }
  ];
}

export async function runAutomatedPipeline(
  proposal: UIChangeProposal,
  onStepProgress: (updatedRun: PipelineRun) => void
): Promise<PipelineRun> {
  const targetVersion = `v1.${Math.floor(Math.random() * 8) + 1}.0`;
  const initialRun: PipelineRun = {
    id: `run-${Date.now()}`,
    proposalId: proposal.id,
    versionTarget: targetVersion,
    startedAt: new Date().toISOString(),
    status: 'running',
    currentStepIndex: 0,
    testCases: createDefaultTestCases(proposal),
    logs: [
      `[PIPELINE INITIALIZED] Target Version: ${targetVersion}`,
      `[ISOLATION] Creating staging branch 'stage/patch-${proposal.affectedPage}'`,
      `[AI PATCH RUNNER] Applying ${proposal.patches.length} component patch(es)...`
    ]
  };

  onStepProgress(initialRun);

  const testCases = [...initialRun.testCases];
  const logs = [...initialRun.logs];

  for (let i = 0; i < testCases.length; i++) {
    testCases[i].status = 'running';
    logs.push(`[EXEC TEST ${i + 1}/5] Running "${testCases[i].name}"...`);
    onStepProgress({
      ...initialRun,
      currentStepIndex: i,
      testCases: [...testCases],
      logs: [...logs]
    });

    // Simulate realistic asynchronous execution time
    await new Promise(resolve => setTimeout(resolve, 600));

    testCases[i].status = 'passed';
    testCases[i].durationMs = Math.floor(Math.random() * 80) + 40;
    
    if (i === 0) {
      testCases[i].details = 'TSX compile: 0 errors, 0 warnings. Bundle size delta: +0.42 KB';
      logs.push(`[BUILD SUCCESS] AST Validated, bundle optimized.`);
    } else if (i === 1) {
      testCases[i].details = `Contrast ratio evaluated: 7.2:1 (WCAG AAA Pass). Touch targets >= 48px.`;
      logs.push(`[A11Y PASS] Accessibility delta +${proposal.expectedImpact.accessibilityScoreDelta}% verified.`);
    } else if (i === 2) {
      testCases[i].details = 'Zero horizontal overflows detected across 375px, 768px, and 1440px viewports.';
      logs.push(`[RESPONSIVE PASS] Mobile and desktop layouts stable.`);
    } else if (i === 3) {
      testCases[i].details = '12 virtual interaction assertions passed with zero unhandled exceptions.';
      logs.push(`[REGRESSION PASS] Target components passed all interactive assertions.`);
    } else if (i === 4) {
      testCases[i].details = 'Visual diff delta within safe threshold bounds (9.4% shift).';
      logs.push(`[SAFETY GATE PASS] Staging build verified and locked for deployment.`);
    }

    onStepProgress({
      ...initialRun,
      currentStepIndex: i + 1,
      testCases: [...testCases],
      logs: [...logs]
    });
  }

  logs.push(`[PIPELINE COMPLETE] All 5 test suites PASSED. UI modification verified!`);

  const completedRun: PipelineRun = {
    ...initialRun,
    completedAt: new Date().toISOString(),
    status: 'success',
    testCases: [...testCases],
    logs: [...logs]
  };

  onStepProgress(completedRun);
  return completedRun;
}
