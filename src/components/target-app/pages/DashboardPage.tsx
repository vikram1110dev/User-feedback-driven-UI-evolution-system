import React from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Activity, Users, Zap, Sparkles, AlertCircle } from 'lucide-react';
import { StatCard } from '../../ui/StatCard';
import { Badge } from '../../ui/Badge';

interface DashboardPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ flags }) => {
  const isComfortDensity = flags.dashboardComfortDensity;

  const telemetryData = [
    { id: 'TR-891', endpoint: '/api/v1/auth/session', latency: '42ms', status: 'Healthy', score: '99.4%', load: 'Normal' },
    { id: 'TR-892', endpoint: '/api/v1/checkout/intent', latency: '88ms', status: 'Optimal', score: '98.9%', load: 'Peak' },
    { id: 'TR-893', endpoint: '/api/v1/telemetry/events', latency: '12ms', status: 'Healthy', score: '99.8%', load: 'Normal' },
    { id: 'TR-894', endpoint: '/api/v1/mutation/preview', latency: '110ms', status: 'Elevated', score: '95.2%', load: 'Spike' },
  ];

  return (
    <div className="py-6 px-3 sm:px-6 max-w-6xl mx-auto space-y-6" data-component-id="DashboardPage.tsx">
      
      {/* State banner */}
      {isComfortDensity ? (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center gap-3 max-w-lg mx-auto shadow-xs animate-fade-in">
          <div className="p-1.5 rounded-xl bg-emerald-200/70 text-emerald-800 flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-sm">UI Evolved: Comfort Density Active</span>
            <span className="text-xs text-emerald-700">Spacious row padding & status tags for high-throughput review</span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-3 max-w-lg mx-auto shadow-xs">
          <div className="p-1.5 rounded-xl bg-amber-200/70 text-amber-800 flex-shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-sm">Baseline UI: Compressed High Density</span>
            <span className="text-xs text-amber-700">Dense text without status tagging creates visual fatigue</span>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Sessions"
          value="14,289"
          delta="+18.4%"
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          title="Average CSAT"
          value="4.8 / 5.0"
          delta="+0.6 pts"
          icon={<Sparkles className="w-5 h-5" />}
        />
        <StatCard
          title="Evolution Speed"
          value="1.8 hrs"
          delta="-45%"
          subtitle="Feedback to deploy"
          icon={<Zap className="w-5 h-5" />}
        />
        <StatCard
          title="Uptime SLA"
          value="99.98%"
          delta="Active"
          icon={<Activity className="w-5 h-5" />}
        />
      </div>

      {/* Telemetry Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md" data-element-selector="#dashboard-telemetry-table">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">Live Telemetry & Endpoint Health</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Client interaction stream with automated health scoring</p>
          </div>
          <Badge variant="teal" size="md" dot>Streaming</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-extrabold uppercase tracking-wider text-xs">
                <th className="pb-3">Trace ID</th>
                <th className="pb-3">Endpoint Route</th>
                <th className="pb-3">Latency</th>
                <th className="pb-3">Health Status</th>
                <th className="pb-3">Satisfaction Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {telemetryData.map((row) => (
                <tr key={row.id} className={`hover:bg-slate-50 transition-colors ${isComfortDensity ? 'py-4' : 'py-2'}`}>
                  <td className={`font-mono text-slate-500 font-medium text-xs sm:text-sm ${isComfortDensity ? 'py-4' : 'py-2.5'}`}>{row.id}</td>
                  <td className={`font-semibold text-slate-800 text-xs sm:text-sm ${isComfortDensity ? 'py-4' : 'py-2.5'}`}>{row.endpoint}</td>
                  <td className={`font-mono font-bold text-teal-600 text-xs sm:text-sm ${isComfortDensity ? 'py-4' : 'py-2.5'}`}>{row.latency}</td>
                  <td className={isComfortDensity ? 'py-4' : 'py-2.5'}>
                    {isComfortDensity ? (
                      <Badge variant={row.status === 'Optimal' || row.status === 'Healthy' ? 'success' : 'warning'} size="sm">
                        {row.status}
                      </Badge>
                    ) : (
                      <span className="text-slate-500 text-xs sm:text-sm">{row.status}</span>
                    )}
                  </td>
                  <td className={`font-bold text-emerald-600 text-xs sm:text-sm ${isComfortDensity ? 'py-4' : 'py-2.5'}`}>{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
