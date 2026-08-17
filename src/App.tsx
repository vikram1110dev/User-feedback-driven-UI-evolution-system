import React from 'react';
import { EvolutionSystemProvider, useEvolutionSystem } from './context/EvolutionSystemContext';
import { SystemNavbar } from './components/navigation/SystemNavbar';
import { TargetAppFrame } from './components/target-app/TargetAppFrame';
import { AdminDashboardOverview } from './components/admin-studio/AdminDashboardOverview';
import { PipelineConsoleView } from './components/pipeline/PipelineConsoleView';
import { SplitComparisonView } from './components/preview-deployment/SplitComparisonView';
import { TraceabilityTimeline } from './components/audit/TraceabilityTimeline';
import { Toast } from './components/ui/Toast';

const AppContent: React.FC = () => {
  const { activeView, toastMessage } = useEvolutionSystem();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Top Navbar */}
      <SystemNavbar />

      {/* Main Viewport Content */}
      <main className="flex-1 w-full bg-slate-50">
        {activeView === 'target-app' && <TargetAppFrame />}
        {activeView === 'admin-studio' && <AdminDashboardOverview />}
        {activeView === 'pipeline-console' && <PipelineConsoleView />}
        {activeView === 'live-preview-split' && <SplitComparisonView />}
        {activeView === 'audit-traceability' && <TraceabilityTimeline />}
      </main>

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <EvolutionSystemProvider>
      <AppContent />
    </EvolutionSystemProvider>
  );
};

export default App;
