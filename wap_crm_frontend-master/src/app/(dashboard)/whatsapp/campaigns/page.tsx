'use client';

import React from 'react';
import { useChatStore } from '@/store/useChatStore';
import { 
  TrendingUp, 
  BarChart3, 
  Send, 
  CheckCheck, 
  MessageSquare, 
  Target,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  XAxis, YAxis, 
  CartesianGrid, Tooltip, 
  ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

// Mock charts data
const funnelData = [
  { name: 'Sent', value: 2500, fill: '#71717a' },
  { name: 'Delivered', value: 2420, fill: '#3b82f6' },
  { name: 'Read', value: 1980, fill: '#a855f7' },
  { name: 'Replied', value: 720, fill: '#eab308' },
  { name: 'Converted', value: 310, fill: '#10b981' },
];

const topCampaignsData = [
  { name: 'August Castings', sent: 1200, converted: 190, conversionRate: 15.8 },
  { name: 'Free Demo Invites', sent: 800, converted: 92, conversionRate: 11.5 },
  { name: 'Product Launch v2', sent: 500, converted: 28, conversionRate: 5.6 },
];

const dailyTrendData = [
  { day: 'Mon', sent: 150, read: 120, conversions: 18 },
  { day: 'Tue', sent: 230, read: 195, conversions: 24 },
  { day: 'Wed', sent: 340, read: 290, conversions: 42 },
  { day: 'Thu', sent: 290, read: 245, conversions: 35 },
  { day: 'Fri', sent: 410, read: 360, conversions: 58 },
  { day: 'Sat', sent: 180, read: 150, conversions: 20 },
  { day: 'Sun', sent: 120, read: 98, conversions: 12 },
];

export default function WhatsAppCampaignAnalytics() {
  const { campaigns } = useChatStore();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>Campaign Analytics</span>
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Deep-dive insights into bulk message campaigns, lead conversion ratios, and delivery performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Messages Sent */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Messages Sent</span>
            <span className="text-lg font-bold text-foreground font-mono">2,500</span>
          </div>
          <Send className="w-8 h-8 text-zinc-500/80 bg-zinc-500/10 p-1.5 rounded-lg" />
        </div>

        {/* Delivered Rate */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Delivered Rate</span>
            <span className="text-lg font-bold text-foreground font-mono">96.8%</span>
          </div>
          <CheckCheck className="w-8 h-8 text-blue-500/80 bg-blue-500/10 p-1.5 rounded-lg" />
        </div>

        {/* Read Rate */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Read Rate</span>
            <span className="text-lg font-bold text-foreground font-mono">81.8%</span>
          </div>
          <CheckCheck className="w-8 h-8 text-purple-500/80 bg-purple-500/10 p-1.5 rounded-lg" />
        </div>

        {/* Reply Rate */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Reply Rate</span>
            <span className="text-lg font-bold text-foreground font-mono">28.8%</span>
          </div>
          <MessageSquare className="w-8 h-8 text-amber-500/80 bg-amber-500/10 p-1.5 rounded-lg" />
        </div>

        {/* Conversions */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Conversions</span>
            <span className="text-lg font-bold text-primary font-mono">12.4%</span>
          </div>
          <Target className="w-8 h-8 text-primary/80 bg-primary/10 p-1.5 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily message volume chart */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Daily Outbound Traffic</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTrendData}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  labelStyle={{ fontSize: '10px', color: 'hsl(var(--muted-foreground))' }}
                  itemStyle={{ fontSize: '11px', color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="sent" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} fill="transparent" />
                <Area type="monotone" dataKey="read" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorSent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message Conversion Funnel</h3>
          <div className="h-56 w-full flex items-center justify-between gap-4">
            <div className="flex-1 space-y-3">
              {funnelData.map((step) => {
                const percent = ((step.value / funnelData[0].value) * 100).toFixed(0);
                return (
                  <div key={step.name} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-muted-foreground">{step.name}</span>
                      <span className="font-mono text-foreground font-bold">{step.value} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: step.fill }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Campaigns */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Top Performing Campaigns</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCampaignsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '11px', color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="conversionRate" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="divide-y divide-border/60">
            {topCampaignsData.map((camp) => (
              <div key={camp.name} className="py-3 flex justify-between items-center text-xs first:pt-0 last:pb-0">
                <div>
                  <span className="font-bold text-foreground block">{camp.name}</span>
                  <span className="text-[10px] text-muted-foreground block">Broadcast Size: {camp.sent} leads</span>
                </div>
                <div className="text-right">
                  <span className="text-primary font-bold block">{camp.conversionRate}% Conv.</span>
                  <span className="text-[10px] text-muted-foreground font-mono block">{camp.converted} Closed Deals</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
