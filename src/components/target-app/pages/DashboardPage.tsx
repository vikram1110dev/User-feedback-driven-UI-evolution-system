import React from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { Activity, Users, Zap, Sparkles, AlertCircle, RefreshCw, ArrowUpRight } from 'lucide-react';
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
    <div className="py-4 px-2 sm:px-4 max-w-6xl mx-auto space-y-5" data-component-id="DashboardPage.tsx">
      
      {/* State banner */}
      {isComfortDensity ? (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 max-w-md mx-auto shadow-md animate-fade-in">
          <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold block">UI Evolved: Comfort Density Active</span>
            <span className="text-[11px] text-emerald-400/80">Spacious row padding & status tags for high-throughput review</span>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-xs flex items-center gap-2.5 max-w-md mx-auto">
          <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 flex-shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold block">Baseline UI: Compressed High Density</span>
            <span className="text-[11px] text-amber-300/70">Dense text without status tagging creates visual fatigue</span>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Active Sessions"
          value="14,289"
          delta="+18.4%"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          title="Average CSAT"
          value="4.8 / 5.0"
          delta="+0.6 pts"
          icon={<Sparkles className="w-4 h-4" />}
        />
        <StatCard
          title="Evolution Speed"
          value="1.8 hrs"
          delta="-45%"
          subtitle="Feedback to deploy"
          icon={<Zap className="w-4 h-4" />}
        />
        <StatCard
          title="Uptime SLA"
          value="99.98%"
          delta="Active"
          icon={<Activity className="w-4 h-4" />}
        />
      </div>

      {/* Telemetry Table */}
      <div className="pro-card p-5 rounded-3xl border border-white/10" data-element-selector="#dashboard-telemetry-table">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold font-display text-white">Live Telemetry & Endpoint Health</h3>
            <p className="text-[11px] text-slate-400">Client interaction stream with automated health scoring</p>
          </div>
          <Badge variant="cyan" size="sm" dot>Streaming</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-2.5">Trace ID</th>
                <th className="pb-2.5">Route</th>
                <th className="pb-2.5">Latency</th>
                <th className="pb-2.5">Health</th>
                <th className="pb-2.5">Satisfaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {telemetryData.map((row) => (
                <tr key={row.id} className={`hover:bg-white/[0.02] transition-colors ${isComfortDensity ? 'py-3.5' : 'py-1.5'}`}>
                  <td className={`font-mono text-slate-400 text-[11px] ${isComfortDensity ? 'py-3' : 'py-1.5'}`}>{row.id}</td>
                  <td className={`font-medium text-slate-200 text-[11px] ${isComfortDensity ? 'py-3' : 'py-1.5'}`}>{row.endpoint}</td>
                  <td className={`font-mono text-cyan-400 text-[11px] ${isComfortDensity ? 'py-3' : 'py-1.5'}`}>{row.latency}</td>
                  <td className={isComfortDensity ? 'py-3' : 'py-1.5'}>
                    {isComfortDensity ? (
                      <Badge variant={row.status === 'Optimal' || row.status === 'Healthy' ? 'success' : 'warning'} size="sm">
                        {row.status}
                      </Badge>
                    ) : (
                      <span className="text-slate-400 text-[11px]">{row.status}</span>
                    )}
                  </td>
                  <td className={`font-semibold text-emerald-400 text-[11px] ${isComfortDensity ? 'py-3' : 'py-1.5'}`}>{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
