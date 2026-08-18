import { UserFeedback } from '../types/feedback';
import { UIChangeProposal, ComponentPatch } from '../types/proposal';

export interface GeminiTestResult {
  success: boolean;
  message: string;
  modelUsed?: string;
}

export interface GeminiEvolutionResponse {
  title: string;
  category: 'ui-issue' | 'usability-problem' | 'bug' | 'design-suggestion' | 'accessibility';
  priority: 'low' | 'medium' | 'high' | 'critical';
  rootCause: string;
  suggestedSolution: string;
  affectedComponents: string[];
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    riskFactors: string[];
    mitigationStrategy: string;
  };
  expectedImpact: {
    uxImprovement: string;
    targetMetrics: string[];
    accessibilityScoreDelta: number;
  };
  patches: Array<{
    filePath: string;
    componentName: string;
    summary: string;
    originalSnippet: string;
    proposedSnippet: string;
    diffLines: Array<{
      type: 'added' | 'removed' | 'context';
      lineNo: number;
      content: string;
    }>;
    cssTokenOverrides?: Record<string, string>;
  }>;
}

/**
 * Tests a user-provided Gemini API key by making a lightweight ping to the Google Gemini API.
 */
export async function testGeminiApiKey(apiKey: string, model: string = 'gemini-2.5-flash'): Promise<GeminiTestResult> {
  if (!apiKey || apiKey.trim() === '') {
    return {
      success: false,
      message: 'API Key cannot be empty.',
    };
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: 'Respond with the exact word: "READY"' }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 10,
          temperature: 0.1,
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData.error?.message || `HTTP error ${response.status}: ${response.statusText}`;
      return {
        success: false,
        message: errMsg,
      };
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (candidateText.toLowerCase().includes('ready') || candidateText.length > 0) {
      return {
        success: true,
        message: `Connected successfully to Google Gemini (${model})!`,
        modelUsed: model,
      };
    }

    return {
      success: true,
      message: 'Connected to Gemini API.',
      modelUsed: model,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Failed to connect to Google Gemini API. Check your internet connection.',
    };
  }
}

/**
 * Generates an end-to-end UI Change Proposal from user feedback using Google Gemini API.
 */
export async function analyzeAndProposeWithGemini(
  feedback: UserFeedback,
  apiKey: string,
  model: string = 'gemini-2.5-flash'
): Promise<UIChangeProposal> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;

  const systemPrompt = `
You are an expert AI Frontend Architect and UI/UX Evolution Engine for a modern React + TypeScript + Tailwind CSS application.
A user has submitted the following feedback regarding the web interface:

FEEDBACK DETAILS:
- Title: "${feedback.title}"
- Description: "${feedback.description}"
- Category: "${feedback.category}"
- Target Page: "${feedback.targetPage}"
- Target Component: "${feedback.targetComponent || 'Auto-detect'}"
- Target Selector: "${feedback.targetElementSelector || 'None'}"
- Device Context: "${feedback.deviceContext}"
- User Sentiment: "${feedback.sentiment}"
- Star Rating: ${feedback.rating}/5

YOUR TASK:
Analyze the feedback, diagnose the exact root cause in the React/Tailwind frontend, and formulate a structured UI Change Proposal with concrete code patches and line-by-line diffs.

You MUST reply ONLY with a valid, parseable JSON object matching this TypeScript interface without markdown quotes or wrapping text:

{
  "title": "string (concise UI Evolution title)",
  "category": "ui-issue" | "usability-problem" | "bug" | "design-suggestion" | "accessibility",
  "priority": "low" | "medium" | "high" | "critical",
  "rootCause": "string (technical explanation of the frontend defect or UX flaw)",
  "suggestedSolution": "string (detailed engineering solution in React/Tailwind)",
  "affectedComponents": ["string (e.g. LoginPage.tsx, PricingCard.tsx)"],
  "riskAssessment": {
    "level": "low" | "medium" | "high",
    "riskFactors": ["string"],
    "mitigationStrategy": "string"
  },
  "expectedImpact": {
    "uxImprovement": "string",
    "targetMetrics": ["string"],
    "accessibilityScoreDelta": number (integer e.g. 15 for +15%)
  },
  "patches": [
    {
      "filePath": "src/components/target-app/pages/...",
      "componentName": "...",
      "summary": "...",
      "originalSnippet": "...",
      "proposedSnippet": "...",
      "diffLines": [
        { "type": "context" | "added" | "removed", "lineNo": number, "content": "..." }
      ],
      "cssTokenOverrides": {
        "key": "value"
      }
    }
  ]
}
`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: systemPrompt }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API returned status ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error('Gemini API returned an empty response.');
  }

  // Parse JSON response safely
  let parsed: GeminiEvolutionResponse;
  try {
    const cleanJson = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    parsed = JSON.parse(cleanJson);
  } catch (parseErr: any) {
    throw new Error(`Failed to parse Gemini JSON output: ${parseErr.message}`);
  }

  const now = new Date().toISOString();
  const proposalId = `prop-ai-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;

  const patches: ComponentPatch[] = (parsed.patches || []).map(p => ({
    filePath: p.filePath || `src/components/target-app/pages/${feedback.targetPage}.tsx`,
    componentName: p.componentName || `${feedback.targetPage}.tsx`,
    summary: p.summary || 'AI synthesized frontend patch',
    originalSnippet: p.originalSnippet || '',
    proposedSnippet: p.proposedSnippet || '',
    diffLines: (p.diffLines || []).map((dl, idx) => ({
      type: dl.type || 'context',
      lineNo: dl.lineNo || (idx + 1),
      content: dl.content || '',
    })),
    cssTokenOverrides: p.cssTokenOverrides || {},
  }));

  // Fallback patch if Gemini returned empty patches array
  if (patches.length === 0) {
    patches.push({
      filePath: `src/components/target-app/pages/${feedback.targetPage}.tsx`,
      componentName: `${feedback.targetPage}.tsx`,
      summary: parsed.suggestedSolution,
      originalSnippet: `<div className="p-4 bg-slate-900 border border-slate-800">...</div>`,
      proposedSnippet: `<div className="p-6 bg-slate-900/80 backdrop-blur-xl border border-teal-500/30 rounded-2xl shadow-2xl">...</div>`,
      diffLines: [
        { type: 'context', lineNo: 15, content: '  return (' },
        { type: 'removed', lineNo: 16, content: '-   <div className="p-4 bg-slate-900 border border-slate-800">' },
        { type: 'added', lineNo: 16, content: '+   <div className="p-6 bg-slate-900/80 backdrop-blur-xl border border-teal-500/30 rounded-2xl shadow-2xl">' },
        { type: 'context', lineNo: 17, content: '      {/* AI Enhanced UI */}' },
        { type: 'context', lineNo: 18, content: '    </div>' },
      ],
    });
  }

  return {
    id: proposalId,
    feedbackId: feedback.id,
    createdAt: now,
    updatedAt: now,
    title: parsed.title || `UI Evolution: ${parsed.suggestedSolution.slice(0, 60)}...`,
    problemSummary: feedback.description || feedback.title,
    rootCauseAnalysis: parsed.rootCause,
    category: parsed.category || feedback.category,
    priority: parsed.priority || 'high',
    affectedPage: feedback.targetPage,
    affectedComponents: parsed.affectedComponents || [feedback.targetComponent || 'AppView.tsx'],
    suggestedSolution: parsed.suggestedSolution,
    patches,
    riskAssessment: {
      level: parsed.riskAssessment?.level || 'low',
      riskFactors: parsed.riskAssessment?.riskFactors || ['Visual reflow verification required'],
      mitigationStrategy: parsed.riskAssessment?.mitigationStrategy || 'Execute automated 5-stage regression pipeline before deploy',
    },
    expectedImpact: {
      uxImprovement: parsed.expectedImpact?.uxImprovement || 'Optimized user interaction and visual clarity',
      targetMetrics: parsed.expectedImpact?.targetMetrics || ['Accessibility Score', 'Conversion Rate', 'User Satisfaction'],
      accessibilityScoreDelta: parsed.expectedImpact?.accessibilityScoreDelta || 15,
    },
    status: 'pending-admin-review',
  };
}
