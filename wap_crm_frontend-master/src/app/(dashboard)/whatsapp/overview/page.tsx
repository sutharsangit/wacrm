'use client';

import React from 'react';
import { useChatStore } from '@/store/useChatStore';
import { useLeadsStore } from '@/store/useLeadsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  CheckCircle2, 
  Phone, 
  ShieldCheck, 
  Layers, 
  Send, 
  Clock, 
  Sparkles, 
  Megaphone,
  MessageCircle,
  FileText,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatTime } from '@/lib/utils';
import Link from 'next/link';

// Mock chart data
const analyticsData = [
  { name: '08:00', sent: 12, delivered: 12, read: 10 },
  { name: '10:00', sent: 34, delivered: 33, read: 28 },
  { name: '12:00', sent: 68, delivered: 67, read: 55 },
  { name: '14:00', sent: 95, delivered: 94, read: 78 },
  { name: '16:00', sent: 110, delivered: 109, read: 92 },
  { name: '18:00', sent: 135, delivered: 133, read: 112 },
  { name: '20:00', sent: 142, delivered: 140, read: 118 },
];

export default function WhatsAppOverview() {
  const { chats, campaigns, templates } = useChatStore();
  const { leads } = useLeadsStore();
  const { user } = useAuthStore();

  const totalUnread = chats.reduce((acc, c) => acc + c.unreadCount, 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'Completed' || c.status === 'Scheduled').length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">WhatsApp Business Overview</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Monitor your WhatsApp Business connection, API analytics, and AI assistant performance.
        </p>
      </div>

      {/* Top Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Connection Status Card */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Connection Status</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-foreground">Connected</span>
            </div>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500/80 bg-emerald-500/10 p-1.5 rounded-lg" />
        </div>

        {/* Connected Number Card */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Connected Number</span>
            <span className="text-sm font-bold text-foreground font-mono">+1 555-019-2834</span>
          </div>
          <Phone className="w-8 h-8 text-primary/80 bg-primary/10 p-1.5 rounded-lg" />
        </div>

        {/* Verification Card */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Meta Verification</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-foreground">Verified</span>
            </div>
          </div>
          <ShieldCheck className="w-8 h-8 text-blue-500/80 bg-blue-500/10 p-1.5 rounded-lg" />
        </div>

        {/* Messaging Tier Card */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Messaging Tier</span>
            <span className="text-sm font-bold text-foreground">Tier 1 (1k daily)</span>
          </div>
          <Layers className="w-8 h-8 text-purple-500/80 bg-purple-500/10 p-1.5 rounded-lg" />
        </div>

        {/* Messages Sent Today Card */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Sent Today</span>
            <span className="text-sm font-bold text-foreground">142 messages</span>
          </div>
          <Send className="w-8 h-8 text-amber-500/80 bg-amber-500/10 p-1.5 rounded-lg" />
        </div>

        {/* Remaining Limit Card */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Remaining Limit</span>
            <span className="text-sm font-bold text-foreground">858 messages</span>
          </div>
          <Clock className="w-8 h-8 text-orange-500/80 bg-orange-500/10 p-1.5 rounded-lg" />
        </div>

        {/* Active Campaigns Card */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Active Campaigns</span>
            <span className="text-sm font-bold text-foreground">{activeCampaigns} campaigns</span>
          </div>
          <Megaphone className="w-8 h-8 text-indigo-500/80 bg-indigo-500/10 p-1.5 rounded-lg" />
        </div>

        {/* AI Qualification Status Card */}
        <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">AI Qualification</span>
            <span className="text-sm font-bold text-primary">Enabled</span>
          </div>
          <Sparkles className="w-8 h-8 text-primary/80 bg-primary/10 p-1.5 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Secondary Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Stats overview */}
        <div className="bg-card border border-border rounded-xl p-6 lg:col-span-1 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Business Details</h3>
          
          <div className="space-y-3.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Business Name</span>
              <span className="font-semibold text-foreground">{user?.businessName || 'Green Pilot AI'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Verification Method</span>
              <span className="font-semibold text-foreground">GST Certificate</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Conversations (Threads)</span>
              <span className="font-semibold text-foreground font-mono">{chats.length}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Broadcast Count</span>
              <span className="font-semibold text-foreground font-mono">{campaigns.length}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Templates Approved</span>
              <span className="font-semibold text-foreground font-mono">{templates.length}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Campaign Success Rate</span>
              <span className="font-semibold text-primary font-mono">96.8%</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border flex justify-between items-center">
            <div className="space-y-0.5">
              <span className="text-[10px] text-muted-foreground font-medium block">Total Unread Messages</span>
              <span className="text-lg font-bold text-foreground font-mono">{totalUnread}</span>
            </div>
            <Link 
              href="/whatsapp/inbox" 
              className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Go to Inbox</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Messaging Traffic chart */}
        <div className="bg-card border border-border rounded-xl p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Daily Message Metrics</h3>
            <div className="flex gap-3 text-[10px] font-semibold">
              <span className="flex items-center gap-1 text-muted-foreground">
                <span className="w-2 h-2 bg-zinc-500 rounded-full" /> Sent
              </span>
              <span className="flex items-center gap-1 text-primary">
                <span className="w-2 h-2 bg-primary rounded-full" /> Read
              </span>
            </div>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorRead" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  labelStyle={{ fontSize: '10px', color: 'hsl(var(--muted-foreground))' }}
                  itemStyle={{ fontSize: '11px', color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="sent" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} fill="transparent" />
                <Area type="monotone" dataKey="read" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorRead)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Messages list */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Recent Inbound Messages</h3>
        <div className="divide-y divide-border/60">
          {chats.slice(0, 3).map((chat) => (
            <div key={chat.leadId} className="py-3 flex justify-between items-center text-xs first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-muted-foreground uppercase">
                  {chat.leadName.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-foreground block">{chat.leadName}</span>
                  <span className="text-[10px] text-muted-foreground block truncate max-w-sm">{chat.lastMessage}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-muted-foreground font-mono block">{formatTime(chat.timestamp)}</span>
                {chat.unreadCount > 0 ? (
                  <span className="inline-block px-1.5 py-0.5 text-[8px] bg-primary text-black font-extrabold rounded-full mt-1">
                    {chat.unreadCount} New
                  </span>
                ) : (
                  <span className="text-[9px] text-primary/80 font-semibold block mt-1 flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3 h-3 text-primary" /> Active
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
