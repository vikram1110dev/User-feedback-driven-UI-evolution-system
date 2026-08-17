import React from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Activity, Users, Zap, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { StatCard } from '../../ui/StatCard';
import { Badge } from '../../ui/Badge';

interface DashboardPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ flags }) => {
  const isComfortDensity = flags.dashboardComfortDensity;

  const telemetryData = [
    { id: 'TL-901', endpoint: '/api/v1/auth/session', latency: '42ms', status: 'Healthy', score: '99.4%', load: 'Normal' },
    { id: 'TL-902', endpoint: '/api/v1/checkout/intent', latency: '88ms', status: 'Optimal', score: '98.9%', load: 'Peak' },
    { id: 'TL-903', endpoint: '/api/v1/telemetry/events', latency: '12ms', status: 'Healthy', score: '99.8%', load: 'Normal' },
    { id: 'TL-904', endpoint: '/api/v1/mutation/preview', latency: '110ms', status: 'Elevated', score: '95.2%', load: 'Spike' },
  ];

  return (
    <div className="py-6 px-4 max-w-6xl mx-auto space-y-6" data-component-id="DashboardPage.tsx">
      
      {/* State banner */}
      {isComfortDensity ? (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 max-w-xl mx-auto animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span><strong>UI Evolved:</strong> Comfort Density Rows, Color Badges & Enhanced Visual Rhythm</span>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs flex items-center gap-2 max-w-xl mx-auto">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span><strong>Baseline UI:</strong> Compact high-density table without status indicators</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Sessions"
          value="14,289"
          delta="+18.4%"
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          title="Avg Feedback CSAT"
          value="4.8 / 5.0"
          delta="+0.6 pts"
          icon={<Sparkles className="w-5 h-5" />}
        />
        <StatCard
          title="Evolution Speed"
          value="1.8 hrs"
          delta="-45%"
          subtitle="Feedback-to-deploy duration"
          icon={<Zap className="w-5 h-5" />}
        />
        <StatCard
          title="Frontend Uptime"
          value="99.98%"
          delta="100% SLA"
          icon={<Activity className="w-5 h-5" />}
        />
      </div>

      {/* Telemetry Table */}
      <div className="glass-card p-6 rounded-3xl border border-white/10" data-element-selector="#dashboard-telemetry-table">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold font-display text-white">Live Telemetry & Endpoint Health</h3>
            <p className="text-xs text-slate-400">Real-time client telemetry stream</p>
          </div>
          <Badge variant="cyan" size="sm" dot>Live Polling</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3">Trace ID</th>
                <th className="pb-3">Endpoint Route</th>
                <th className="pb-3">Latency</th>
                <th className="pb-3">Health Status</th>
                <th className="pb-3">Satisfaction Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {telemetryData.map((row) => (
                <tr key={row.id} className={`hover:bg-white/[0.02] transition-colors ${isComfortDensity ? 'py-4' : 'py-1'}`}>
                  <td className={`font-mono text-slate-400 ${isComfortDensity ? 'py-3.5' : 'py-2'}`}>{row.id}</td>
                  <td className={`font-medium text-slate-200 ${isComfortDensity ? 'py-3.5' : 'py-2'}`}>{row.endpoint}</td>
                  <td className={`font-mono text-cyan-400 ${isComfortDensity ? 'py-3.5' : 'py-2'}`}>{row.latency}</td>
                  <td className={isComfortDensity ? 'py-3.5' : 'py-2'}>
                    {isComfortDensity ? (
                      <Badge variant={row.status === 'Optimal' || row.status === 'Healthy' ? 'success' : 'warning'} size="sm">
                        {row.status}
                      </Badge>
                    ) : (
                      <span className="text-slate-400">{row.status}</span>
                    )}
                  </td>
                  <td className={`font-semibold text-emerald-400 ${isComfortDensity ? 'py-3.5' : 'py-2'}`}>{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
