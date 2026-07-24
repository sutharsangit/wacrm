'use client';

import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line, 
  CartesianGrid, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  mockFunnelStages, 
  mockRevenueTrends, 
  mockLeadSources, 
  mockTeamPerformance, 
  mockMonthlyTrends 
} from '@/mock/mockAnalytics';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Award, 
  Clock, 
  Download, 
  ChevronDown, 
  Sparkles,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExport = (format: 'PDF' | 'CSV') => {
    alert(`Mock Export: Downloading dashboard reports as ${format}...`);
  };

  if (!mounted) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">Analytics Workspace</h2>
          <p className="text-xs text-muted-foreground">In-depth statistical insights on qualification yields and team velocity.</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => handleExport('CSV')}
            className="border border-border bg-muted/60 hover:bg-muted text-muted-foreground font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => handleExport('PDF')}
            className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-lg shadow-primary/10 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-foreground" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* Grid 1: Funnel & Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div>
            <span className="text-xs font-bold block">Qualification Conversion Funnel</span>
            <span className="text-[10px] text-muted-foreground">Conversion stage efficiency from inbound to closed deal.</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={mockFunnelStages}
                margin={{ top: 10, right: 10, left: 35, bottom: 5 }}
              >
                <XAxis type="number" stroke="#6b7280" fontSize={10} hide />
                <YAxis 
                  dataKey="stage" 
                  type="category" 
                  stroke="#6b7280" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#2e2e2e', fontSize: 11 }}
                  formatter={(value) => [`${value} leads`, 'Count']}
                />
                <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]}>
                  {mockFunnelStages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={1 - index * 0.15} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Growth Trend */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div>
            <span className="text-xs font-bold block">MRR Growth Trend</span>
            <span className="text-[10px] text-muted-foreground">Software subscription + platform value. Actual vs Projected.</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockRevenueTrends} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={10} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#2e2e2e', fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="amount" name="Actual MRR" stroke="#10b981" strokeWidth={2.5} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="projected" name="Forecast Target" stroke="#6b7280" strokeWidth={1.5} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid 2: Acquisition Details & Team Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Performance Trends */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 lg:col-span-1">
          <div>
            <span className="text-xs font-bold block">Acquisition Channels Comparison</span>
            <span className="text-[10px] text-muted-foreground">Inbound lead count per channel this month.</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockLeadSources} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="source" stroke="#6b7280" fontSize={9} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#2e2e2e', fontSize: 10 }} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]}>
                  {mockLeadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance Table */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 lg:col-span-2">
          <div>
            <span className="text-xs font-bold block">Team Performance & Response Velocity</span>
            <span className="text-[10px] text-muted-foreground">Lead response intervals, counts and close ratios.</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-secondary/40 border-b border-border text-muted-foreground">
                  <th className="p-3 font-bold uppercase tracking-wider">Agent Name</th>
                  <th className="p-3 font-bold uppercase tracking-wider text-center">Leads Assigned</th>
                  <th className="p-3 font-bold uppercase tracking-wider text-center">Qualified Count</th>
                  <th className="p-3 font-bold uppercase tracking-wider text-center">Conversion Ratio</th>
                  <th className="p-3 font-bold uppercase tracking-wider text-right">Avg Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {mockTeamPerformance.map((item, idx) => (
                  <tr key={idx} className="hover:bg-secondary/15 transition-colors">
                    <td className="p-3 font-semibold text-foreground flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[9px] font-bold uppercase shrink-0">
                        {item.agentName.charAt(0)}
                      </div>
                      <span>{item.agentName}</span>
                    </td>
                    <td className="p-3 text-center text-muted-foreground">{item.leadsAssigned}</td>
                    <td className="p-3 text-center text-muted-foreground">{item.qualifiedCount}</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-foreground">{item.conversionRate}%</span>
                        <div className="w-12 bg-secondary h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${item.conversionRate}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-right text-muted-foreground font-mono text-[11px]">
                      {item.avgResponseTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


