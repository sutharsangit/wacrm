'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLeadsStore } from '@/store/useLeadsStore';
import { useChatStore } from '@/store/useChatStore';
import { 
  Users, 
  UserCheck, 
  MessageCircle, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Zap, 
  ArrowRight,
  TrendingDown,
  Clock,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { mockMonthlyTrends } from '@/mock/mockAnalytics';
import { formatDate } from '@/lib/utils';
import Cookies from 'js-cookie';

export default function DashboardOverview() {
  const [mounted, setMounted] = useState(false);
  const { leads, addLead } = useLeadsStore();
  const { chats } = useChatStore();
  const [showAddLead, setShowAddLead] = useState(false);
  
  // Quick lead form state
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    source: 'Website Forms' as any,
    score: 50,
    status: 'New' as any,
    assignedUserId: 'u2'
  });

  const [dashboardData, setDashboardData] = useState<{
    totalLeads: number;
    qualifiedLeads: number;
    newLeads: number;
    hotLeads: number;
    conversionRate: string;
  } | null>(null);

  const [leadSources, setLeadSources] = useState<any[]>([]);
  const [qualifications, setQualifications] = useState<any[]>([]);
  const [monthlyTrends, setMonthlyTrends] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = Cookies.get('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const [dashRes, sourcesRes, qualRes, trendsRes] = await Promise.all([
        fetch(`${API_URL}/analytics/dashboard`, { headers }),
        fetch(`${API_URL}/analytics/sources`, { headers }),
        fetch(`${API_URL}/analytics/qualifications`, { headers }),
        fetch(`${API_URL}/analytics/trends`, { headers })
      ]);

      if (dashRes.ok) setDashboardData((await dashRes.json()).data);
      if (sourcesRes.ok) {
        const sources = (await sourcesRes.json()).data;
        const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
        setLeadSources(sources.map((s: any, i: number) => ({ source: s.source, count: s.count, color: colors[i % colors.length] })));
      }
      if (qualRes.ok) {
        const quals = (await qualRes.json()).data;
        const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'];
        setQualifications(quals.map((q: any, i: number) => ({ status: q.status, count: q.count, color: colors[i % colors.length] })));
      }
      if (trendsRes.ok) {
        setMonthlyTrends((await trendsRes.json()).data);
      }
    } catch (error) {
      console.error('Error fetching analytics', error);
    }
  };

  // Compute live KPIs from Backend
  const totalLeadsCount = dashboardData?.totalLeads || leads.length;
  const qualifiedLeadsCount = dashboardData?.qualifiedLeads || leads.filter(l => l.status === 'Qualified' || l.status === 'Won').length;
  const hotLeadsCount = dashboardData?.hotLeads || 0;
  const conversionRate = dashboardData?.conversionRate || (totalLeadsCount > 0 ? Math.round((leads.filter(l => l.status === 'Won').length / totalLeadsCount) * 100) : 0);

  // Compile consolidated recent timeline activities across all leads
  const allActivities = leads.flatMap(lead => 
    lead.timeline.map(event => ({
      ...event,
      leadName: lead.name,
      leadId: lead.id
    }))
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
   .slice(0, 5);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    addLead(newLeadForm);
    setShowAddLead(false);
    setNewLeadForm({
      name: '',
      phone: '',
      email: '',
      company: '',
      source: 'Website Forms',
      score: Math.floor(Math.random() * 40) + 55, // mock qualified score
      status: 'New',
      assignedUserId: 'u2'
    });
  };

  if (!mounted) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Top Banner Greetings */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">Sales Command Console</h2>
          <p className="text-xs text-muted-foreground">Real-time mock feed syncing active channels.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddLead(true)}
            className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 shadow-lg shadow-primary/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Lead</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Leads */}
        <div className="bg-card border border-border p-5 rounded-xl hover:border-primary/30 transition-all flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground leading-none">{totalLeadsCount}</h3>
            <span className="text-[10px] text-primary font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +12% vs last month
            </span>
          </div>
        </div>

        {/* Qualified Leads */}
        <div className="bg-card border border-border p-5 rounded-xl hover:border-primary/30 transition-all flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Qualified</span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground leading-none">{qualifiedLeadsCount}</h3>
            <span className="text-[10px] text-primary font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> {Math.round((qualifiedLeadsCount / (totalLeadsCount || 1)) * 100)}% qualification rate
            </span>
          </div>
        </div>

        {/* Hot Leads */}
        <div className="bg-card border border-border p-5 rounded-xl hover:border-primary/30 transition-all flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Hot Leads</span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
              <Zap className="w-4 h-4 text-orange-500" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground leading-none">{hotLeadsCount}</h3>
            <span className="text-[10px] text-orange-500 font-medium flex items-center gap-1 mt-1">
              High priority prospects
            </span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-card border border-border p-5 rounded-xl hover:border-primary/30 transition-all flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Conversion Rate</span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground leading-none">{conversionRate}%</h3>
            <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 mt-1">
              Closed Won deals
            </span>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-card border border-border p-5 rounded-xl hover:border-primary/30 transition-all flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">MRR</span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground leading-none">$0</h3>
            <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 mt-1">
              0% MRR grow
            </span>
          </div>
        </div>
      </div>

      {/* Graphics Visualiser Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend Area Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <span className="text-xs font-bold block">Lead Traffic Trend</span>
              <span className="text-[10px] text-muted-foreground">Historical Monthly Volume Overview</span>
            </div>
            <span className="text-[10px] font-semibold text-primary px-2 py-0.5 border border-primary/20 rounded bg-primary/5">Synced</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrends.length > 0 ? monthlyTrends : mockMonthlyTrends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6b7280" fontSize={10} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#2e2e2e', fontSize: 11 }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="leads" name="Total Inbound" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="qualified" name="AI Qualified" stroke="#3b82f6" strokeWidth={1.5} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Pie Chart */}
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between">
          <div className="border-b border-border pb-3">
            <span className="text-xs font-bold block">Lead Sources</span>
            <span className="text-[10px] text-muted-foreground">Acquisition Channel Distribution</span>
          </div>
          <div className="h-44 w-full relative flex items-center justify-center my-3">
            {leadSources.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {leadSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#2e2e2e', fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-xs">No data available</div>
            )}
            <div className="absolute text-center">
              <span className="text-xs font-semibold text-muted-foreground block leading-none">TOTAL</span>
              <span className="text-lg font-bold text-foreground mt-1 block">{totalLeadsCount}</span>
            </div>
          </div>
          
          {/* Pie Chart Legend */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {leadSources.map((item) => (
              <div key={item.source} className="flex items-center gap-2 px-2 py-1 bg-secondary/30 rounded border border-border/40">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate text-muted-foreground">{item.source}</span>
                <span className="font-bold text-foreground ml-auto">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Logs */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
          <div>
            <span className="text-xs font-bold block">Recent Activity Streams</span>
            <span className="text-[10px] text-muted-foreground">Consolidated Lead Event Timeline Logs</span>
          </div>
          <Link href="/leads" className="text-[10px] text-primary hover:underline font-semibold flex items-center gap-1 transition-all">
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="relative border-l border-border ml-3 pl-6 space-y-5">
          {allActivities.map((activity) => (
            <div key={activity.id} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full border-border border-2 border-zinc-950 group-hover:bg-primary group-hover:scale-125 transition-all" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="text-xs font-semibold text-foreground">{activity.title}</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    For lead: <Link href={`/leads?id=${activity.leadId}`} className="text-primary hover:underline font-medium">{activity.leadName}</Link> — {activity.description}
                  </p>
                </div>
                <span className="text-[9px] text-muted-foreground uppercase shrink-0 font-medium font-mono">
                  {formatDate(activity.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Lead Modal */}
      {showAddLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full relative animate-fade-in">
            <h3 className="text-base font-bold">Create New Lead Entry</h3>
            <p className="text-xs text-muted-foreground">Add a lead record manually into the dashboard pipeline.</p>

            <form onSubmit={handleCreateLead} className="mt-4 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-[9px] uppercase font-bold text-muted-foreground block mb-1">Lead Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="David Miller"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full bg-muted border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase font-bold text-muted-foreground block mb-1">Phone Number</label>
                <input 
                  type="text" 
                  required
                  placeholder="+1 (555) 123-4567"
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  className="w-full bg-muted border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase font-bold text-muted-foreground block mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="david@miller.com"
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  className="w-full bg-muted border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase font-bold text-muted-foreground block mb-1">Company</label>
                <input 
                  type="text" 
                  placeholder="Miller Co"
                  value={newLeadForm.company}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                  className="w-full bg-muted border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase font-bold text-muted-foreground block mb-1">Acquisition Source</label>
                <select
                  value={newLeadForm.source}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value as any })}
                  className="w-full bg-muted border border-border rounded p-2 text-xs text-muted-foreground focus:outline-none focus:border-primary"
                >
                  <option value="Meta Ads">Meta Ads</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Website Forms">Website Forms</option>
                  <option value="CSV Upload">CSV Upload</option>
                </select>
              </div>

              <div className="col-span-2 flex justify-end gap-3 mt-4 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddLead(false)}
                  className="px-4 py-2 border border-border text-xs font-semibold rounded text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-black font-semibold rounded text-xs hover:bg-primary/90"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



