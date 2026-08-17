# User Feedback Driven UI Evolution System

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![HITL Governance](https://img.shields.io/badge/Governance-Human--in--the--Loop-emerald.svg)]()

**User Feedback Driven UI Evolution System** is an AI-powered frontend improvement and change-management platform that continuously evolves a web application's user interface based on real user feedback with strict Human-in-the-Loop admin governance.

---

## ⚡ Core Workflow

$$\text{User Feedback} \longrightarrow \text{AI Analysis} \longrightarrow \text{Change Proposal} \longrightarrow \text{Admin Review (HITL)} \longrightarrow \text{Approval} \longrightarrow \text{Automated Modification} \longrightarrow \text{Testing} \longrightarrow \text{Preview} \longrightarrow \text{Deployment}$$

1. **User Feedback Collection**: Customers report UI issues, bugs, suggestions, and accessibility friction directly from the live application using hover element inspectors and viewport pinpoint pins.
2. **AI-Powered Feedback Analysis**: Deep natural language understanding categorizes feedback, diagnoses root causes, maps affected components (`LoginPage.tsx`, `PricingPage.tsx`, etc.), and scores severity/priority.
3. **Structured UI Change Proposal**: Converts analyzed feedback into isolated staging patches and syntax-highlighted code diffs.
4. **Human-in-the-Loop Admin Approval**: Administrators review original feedback, AI diagnoses, and code modifications in a dedicated review studio before any change can proceed.
5. **Automated Testing Pipeline**: Runs 5-stage automated quality gates (TypeScript Build & Lint, WCAG AA/AAA Contrast Analysis, Multi-Viewport Breakpoint Matrix, Interaction Regressions, and Visual Diff Thresholds).
6. **Live Preview & Controlled Deployment**: Interactive side-by-side split screen comparing Production vs Staging, 1-click zero-downtime deployment, and instant rollback support.
7. **Full Audit Traceability**: Immutable event log tracking every change from user comment to production git commit.

---

## 🚀 Key Features

* **In-App Feedback Widget SDK**:
  * Hover element highlighter with bounding box and CSS selector detection.
  * Viewport coordinate drop pin annotations.
  * Star rating (1-5) and emotional sentiment reaction tags.
  * Multi-modal feedback taxonomy (UI Issue, Usability Problem, Accessibility, Design Suggestion, Bug).
* **Synthetic Persona Simulator**:
  * One-click simulation of diverse user personas (Mobile Shopper, Accessibility Lead, Growth Specialist, Data Analyst) to stress-test continuous evolution.
* **Admin Governance Studio**:
  * Feedback inbox with instant filtering and search.
  * Side-by-side Proposal Reviewer with risk analysis and impact estimation.
  * Approve, Reject, and Request Modifications workflow.
* **Automated Quality Gates**:
  * Real-time test console logs and pass/fail indicators.
  * Accessibility (a11y) contrast calculator.
* **Interactive Live Preview**:
  * Multi-device viewport switcher (Mobile 375px / Tablet 768px / Desktop Full).
  * Production vs Staging visual comparison.
  * 1-Click Rollback engine.

---

## 🛠️ Quick Start & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/vikram1110dev/User-feedback-driven-UI-evolution-system.git

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build production bundle
npm run build
```

---

## 📁 Project Structure

```
User-feedback-driven-UI-evolution-system/
├── src/
│   ├── components/
│   │   ├── admin-studio/         # HITL Governance, Feedback Inbox & Diff Viewer
│   │   ├── audit/                # Version History & Traceability Timeline
│   │   ├── navigation/           # Top Navigation Bar & Mode Switchers
│   │   ├── pipeline/             # Automated Testing Runner & Console Logs
│   │   ├── preview-deployment/   # Split Comparison & 1-Click Deploy
│   │   ├── target-app/           # Live Target Application (Login, Pricing, Hero, Dashboard)
│   │   │   └── feedback-widget/  # In-App Element Highlighter, Drop Pins & FAB
│   │   └── ui/                   # Reusable UI Primitives (Button, Badge, StatCard, Toast)
│   ├── context/
│   │   └── EvolutionSystemContext.tsx # Centralized State Management
│   ├── engine/
│   │   ├── aiFeedbackAnalyzer.ts # AI NLP parsing & root cause diagnosis
│   │   ├── automatedTester.ts    # 5-stage automated test runner
│   │   ├── proposalEngine.ts     # Code diff and patch synthesis
│   │   └── syntheticFeedback.ts  # Pre-configured realistic personas
│   ├── types/                    # Strict TypeScript type definitions
│   └── data/                     # Baseline seeds & initial deployments
```
