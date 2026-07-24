'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLeadsStore } from '@/store/useLeadsStore';
import { LeadStatus, Lead } from '@/mock/mockLeads';
import { mockUsers } from '@/mock/mockUsers';
import { 
  Plus, 
  Search, 
  Zap, 
  MoreHorizontal, 
  Eye, 
  Trash2, 
  ArrowRight,
  User,
  Sparkles,
  Kanban
} from 'lucide-react';
import { cn } from '@/lib/utils';

const STAGES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Follow-Up', 'Won', 'Lost'];

export default function CrmKanban() {
  const { leads, updateLeadStatus, deleteLead } = useLeadsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLeadId(leadId);
    e.dataTransfer.setData('text/plain', leadId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: LeadStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain') || draggedLeadId;
    if (leadId) {
      updateLeadStatus(leadId, targetStatus);
    }
    setDraggedLeadId(null);
  };

  // Filter leads based on search query
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getLeadsByStage = (stage: LeadStatus) => {
    return filteredLeads.filter(lead => lead.status === stage);
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-primary/10 border-primary/20 text-primary';
    if (score >= 50) return 'bg-amber-500/10 border-amber-500/20 text-amber-500';
    return 'bg-secondary border-zinc-700 text-muted-foreground';
  };

  return (
    <div className="space-y-6 pb-12 flex flex-col min-h-screen">
      {/* Page Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">Pipeline Kanban Board</h2>
          <p className="text-xs text-muted-foreground">Drag and drop qualified leads across deal stages.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Quick search pipeline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-xs text-foreground focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Board Scrollable Viewport */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1200px] h-[calc(100vh-250px)]">
          {STAGES.map((stage) => {
            const stageLeads = getLeadsByStage(stage);
            return (
              <div
                key={stage}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage)}
                className="flex flex-col w-72 bg-secondary/15 rounded-xl border border-border/80 p-3 h-full overflow-hidden"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{stage}</span>
                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full font-bold text-muted-foreground">
                      {stageLeads.length}
                    </span>
                  </div>
                </div>

                {/* Cards List container */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {stageLeads.length > 0 ? (
                    stageLeads.map((lead) => {
                      const assignee = mockUsers.find(u => u.id === lead.assignedUserId);
                      return (
                        <div
                          key={lead.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, lead.id)}
                          className={cn(
                            "bg-card border border-border rounded-xl p-3.5 space-y-3 cursor-grab active:cursor-grabbing hover:border-zinc-700 transition-all shadow-md select-none relative overflow-hidden group",
                            draggedLeadId === lead.id ? 'opacity-30' : ''
                          )}
                        >
                          {/* Top row */}
                          <div className="flex items-start justify-between">
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-secondary border border-border text-muted-foreground">
                              {lead.source}
                            </span>
                            <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold border inline-flex items-center gap-0.5", getScoreBg(lead.score))}>
                              <Zap className="w-2.5 h-2.5 fill-current shrink-0" />
                              {lead.score}
                            </span>
                          </div>

                          {/* Lead Name */}
                          <div>
                            <span className="font-bold text-xs text-foreground block group-hover:text-primary transition-colors">
                              {lead.name}
                            </span>
                            <span className="text-[9px] text-muted-foreground block mt-0.5">
                              {lead.company || 'Private Buyer'}
                            </span>
                          </div>

                          {/* Owner & quick routes */}
                          <div className="flex items-center justify-between border-t border-border/40 pt-2.5 text-[9px] text-muted-foreground font-mono">
                            <div className="flex items-center gap-1">
                              <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[8px] font-bold uppercase">
                                {assignee?.name.charAt(0)}
                              </div>
                              <span className="text-[9px] font-medium">{assignee?.name}</span>
                            </div>

                            {/* Click details */}
                            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link 
                                href={`/leads?id=${lead.id}`}
                                className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground"
                                title="Open in Leads page"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete ${lead.name}?`)) deleteLead(lead.id);
                                }}
                                className="p-1 hover:bg-secondary rounded text-destructive"
                                title="Delete lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-full flex items-center justify-center border-2 border-dashed border-border rounded-xl py-12 text-center">
                      <div className="max-w-[180px] space-y-1 text-muted-foreground">
                        <Kanban className="w-5 h-5 mx-auto opacity-30" />
                        <span className="text-[10px] font-semibold block">Stage is empty</span>
                        <p className="text-[9px] leading-tight">Drag leads here to update pipeline.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


