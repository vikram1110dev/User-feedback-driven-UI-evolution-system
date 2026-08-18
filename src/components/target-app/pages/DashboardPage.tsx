import React, { useState } from 'react';
import { EvolutionFlags } from '../../../context/EvolutionSystemContext';
import { 
  Activity, 
  Users, 
  Zap, 
  Sparkles, 
  AlertCircle, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import { StatCard } from '../../ui/StatCard';
import { Badge } from '../../ui/Badge';

interface DashboardPageProps {
  flags: EvolutionFlags;
  isStagingPreview?: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ flags }) => {
  const isComfortDensity = flags.dashboardComfortDensity;

  const [activeTab, setActiveTab] = useState<'telemetry' | 'analytics'>('telemetry');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [densityOverride, setDensityOverride] = useState<boolean | null>(null);

  const effectiveDensity = densityOverride !== null ? densityOverride : isComfortDensity;

  const telemetryData = [
    { id: 'TR-891', endpoint: '/api/v1/auth/session', latency: '42ms', status: 'Healthy', score: '99.4%', load: 'Normal', timestamp: '10s ago', payload: '{ user_id: "usr_9981", method: "oauth_sso", scope: "read:write" }' },
    { id: 'TR-892', endpoint: '/api/v1/checkout/intent', latency: '88ms', status: 'Optimal', score: '98.9%', load: 'Peak', timestamp: '24s ago', payload: '{ tier: "enterprise_annual", seats: 25, currency: "USD" }' },
    { id: 'TR-893', endpoint: '/api/v1/telemetry/events', latency: '12ms', status: 'Healthy', score: '99.8%', load: 'Normal', timestamp: '31s ago', payload: '{ event_count: 1420, client_runtime: "React 19" }' },
    { id: 'TR-894', endpoint: '/api/v1/mutation/preview', latency: '110ms', status: 'Elevated', score: '95.2%', load: 'Spike', timestamp: '45s ago', payload: '{ patch_id: "p_884", diff_lines: 14, visual_shift: "4.2%" }' },
    { id: 'TR-895', endpoint: '/api/v1/a11y/contrast_scan', latency: '28ms', status: 'Optimal', score: '99.9%', load: 'Normal', timestamp: '1m ago', payload: '{ wcag_level: "AAA", ratio: "7.4:1", passed: true }' },
  ];

  const filteredTelemetry = telemetryData.filter(row => {
    const matchesSearch = row.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) || row.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || row.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-6 px-3 sm:px-6 max-w-6xl mx-auto space-y-6" data-component-id="DashboardPage.tsx">
      
      {/* State banner */}
      {effectiveDensity ? (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center justify-between gap-3 shadow-xs animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl bg-emerald-200/70 text-emerald-800 flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold block text-sm">UI Evolved: Comfort Density Active</span>
              <span className="text-xs text-emerald-700">Spacious row padding & status tags for high-throughput telemetry review</span>
            </div>
          </div>
          <Badge variant="success" size="sm">Evolved State</Badge>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl bg-amber-200/70 text-amber-800 flex-shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold block text-sm">Baseline UI: Compressed High Density</span>
              <span className="text-xs text-amber-700">Dense unpadded rows without badges create visual fatigue</span>
            </div>
          </div>
          <Badge variant="neutral" size="sm">Baseline</Badge>
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

      {/* Sub-tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'telemetry'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Live Telemetry Stream</span>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Evolution Analytics & Charts</span>
        </button>
      </div>

      {activeTab === 'telemetry' ? (
        /* Telemetry Table View */
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4" data-element-selector="#dashboard-telemetry-table">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">Live Telemetry & Endpoint Health</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Real-time client request latency and automated status scoring</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDensityOverride(!effectiveDensity)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer border border-slate-200"
                title="Toggle Table Density"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Density: {effectiveDensity ? 'Comfortable' : 'Compact'}</span>
              </button>
              <Badge variant="teal" size="md" dot>Live Stream</Badge>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trace ID or route..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium">
              {['all', 'healthy', 'optimal', 'elevated'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-xl capitalize transition-all cursor-pointer ${
                    selectedStatus === st
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[11px]">
                  <th className="pb-3">Trace ID</th>
                  <th className="pb-3">Endpoint Route</th>
                  <th className="pb-3">Latency</th>
                  <th className="pb-3">Health Status</th>
                  <th className="pb-3">Satisfaction Score</th>
                  <th className="pb-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTelemetry.map((row) => {
                  const isExpanded = expandedRow === row.id;
                  return (
                    <React.Fragment key={row.id}>
                      <tr 
                        onClick={() => setExpandedRow(isExpanded ? null : row.id)}
                        className={`hover:bg-slate-50 transition-colors cursor-pointer ${effectiveDensity ? 'py-4' : 'py-1.5'}`}
                      >
                        <td className={`font-mono text-slate-500 font-medium text-xs ${effectiveDensity ? 'py-3.5' : 'py-2'}`}>{row.id}</td>
                        <td className={`font-semibold text-slate-800 text-xs sm:text-sm ${effectiveDensity ? 'py-3.5' : 'py-2'}`}>{row.endpoint}</td>
                        <td className={`font-mono font-bold text-teal-600 text-xs ${effectiveDensity ? 'py-3.5' : 'py-2'}`}>{row.latency}</td>
                        <td className={effectiveDensity ? 'py-3.5' : 'py-2'}>
                          {effectiveDensity ? (
                            <Badge variant={row.status === 'Optimal' || row.status === 'Healthy' ? 'success' : 'warning'} size="sm">
                              {row.status}
                            </Badge>
                          ) : (
                            <span className="text-slate-500 text-xs">{row.status}</span>
                          )}
                        </td>
                        <td className={`font-bold text-emerald-600 text-xs ${effectiveDensity ? 'py-3.5' : 'py-2'}`}>{row.score}</td>
                        <td className={`text-slate-400 ${effectiveDensity ? 'py-3.5' : 'py-2'}`}>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-teal-600" /> : <ChevronDown className="w-4 h-4" />}
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-slate-50/80">
                          <td colSpan={6} className="p-4 text-xs font-mono text-slate-700 space-y-2">
                            <div className="flex items-center justify-between text-slate-500">
                              <span>Recorded: {row.timestamp} • Load: {row.load}</span>
                              <span className="text-emerald-700 font-bold">200 OK</span>
                            </div>
                            <pre className="bg-slate-900 text-teal-300 p-3 rounded-xl overflow-x-auto text-[11px]">
                              {row.payload}
                            </pre>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Analytics View with Visual Charts */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          
          {/* Chart 1: Conversion Lift vs Evolution Cycle */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Conversion Rate Lift by Release</h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                +24.8% Total Gain
              </span>
            </div>

            {/* Simulated SVG Bar Chart */}
            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-200">
              {[
                { version: 'v1.0.0 (Base)', value: 45, label: '3.2%' },
                { version: 'v1.1.0', value: 65, label: '3.8%' },
                { version: 'v1.2.0', value: 80, label: '4.4%' },
                { version: 'v1.3.0 (Now)', value: 100, label: '5.1%' },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-teal-700">{item.label}</span>
                  <div 
                    className="w-full rounded-t-xl bg-gradient-to-t from-teal-600 to-emerald-400 transition-all duration-500 hover:opacity-90 shadow-sm"
                    style={{ height: `${item.value}%` }}
                  />
                  <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">{item.version}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">Autonomous frontend evolutions have improved sign-in and checkout conversion steadily.</p>
          </div>

          {/* Chart 2: Sentiment Distribution */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <PieChart className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Feedback Sentiment Distribution</h3>
              </div>
              <Badge variant="teal" size="sm">Real-time NLP</Badge>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { label: 'Positive / Delight', pct: 48, color: 'bg-emerald-500', text: 'text-emerald-700' },
                { label: 'Constructive Suggestion', pct: 28, color: 'bg-teal-500', text: 'text-teal-700' },
                { label: 'UI Issue / Minor Friction', pct: 16, color: 'bg-amber-500', text: 'text-amber-700' },
                { label: 'Frustrated / Urgent Bug', pct: 8, color: 'bg-rose-500', text: 'text-rose-700' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700">{item.label}</span>
                    <span className={item.text}>{item.pct}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Negative friction reduced by 62% post-deployment</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
