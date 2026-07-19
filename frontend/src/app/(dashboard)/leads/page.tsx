'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLeadsStore } from '@/store/useLeadsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  Search, 
  Filter, 
  Trash2, 
  Edit2, 
  Zap, 
  User, 
  Phone, 
  Mail, 
  Building, 
  Calendar, 
  FileText, 
  Activity, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  PhoneCall,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import { formatDate, cn } from '@/lib/utils';
import { LeadStatus, Lead } from '@/mock/mockLeads';
import { mockUsers } from '@/mock/mockUsers';

function LeadsContent() {
  const searchParams = useSearchParams();
  const { leads, fetchLeads, updateLeadStatus, updateLeadOwner, addNoteToLead, logCallForLead, deleteLead } = useLeadsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  
  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'createdAt' | 'score' | 'name'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form states inside slide-over
  const [newNote, setNewNote] = useState('');
  const [newCallDesc, setNewCallDesc] = useState('');
  const [newCallDuration, setNewCallDuration] = useState('2m 00s');
  
  // Check for URL query ID parameter to auto-open specific lead details
  useEffect(() => {
    const urlLeadId = searchParams.get('id');
    if (urlLeadId && leads.some(l => l.id === urlLeadId)) {
      setActiveLeadId(urlLeadId);
    }
  }, [searchParams, leads]);

  const activeLead = leads.find(l => l.id === activeLeadId);

  // Filter and Sort leads logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.phone.includes(searchQuery) ||
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'ALL' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  }).sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'createdAt') {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === 'score') {
      comparison = a.score - b.score;
    } else if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !activeLeadId) return;
    addNoteToLead(activeLeadId, newNote, user?.name || 'Administrator');
    setNewNote('');
  };

  const handleLogCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCallDesc.trim() || !activeLeadId) return;
    logCallForLead(activeLeadId, newCallDuration, newCallDesc, user?.name || 'Administrator');
    setNewCallDesc('');
    setNewCallDuration('2m 00s');
  };

  const handleToggleSort = (field: 'createdAt' | 'score' | 'name') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-primary border-primary/20 bg-primary/5';
    if (score >= 50) return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
    return 'text-zinc-500 border-zinc-800 bg-zinc-900/40';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: 'Hot Lead', bg: 'bg-primary/10 border-primary/30 text-primary' };
    if (score >= 50) return { label: 'Warm Lead', bg: 'bg-amber-500/10 border-amber-500/30 text-amber-500' };
    return { label: 'Cold Lead', bg: 'bg-zinc-800 border-zinc-700 text-zinc-500' };
  };

  const getStatusBadge = (status: LeadStatus) => {
    const configs: Record<LeadStatus, string> = {
      New: 'bg-blue-500/10 border-blue-500/30 text-blue-500',
      Contacted: 'bg-amber-500/10 border-amber-500/30 text-amber-500',
      Qualified: 'bg-primary/15 border-primary/40 text-primary',
      'Follow-Up': 'bg-purple-500/10 border-purple-500/30 text-purple-500',
      Won: 'bg-emerald-500 text-emerald-950 font-bold',
      Lost: 'bg-zinc-800 border-zinc-700 text-zinc-500'
    };
    return configs[status] || 'bg-zinc-800 text-zinc-500';
  };

  return (
    <div className="space-y-6 pb-12 flex relative min-h-screen">
      {/* Master Leads List (Table View) */}
      <div className={cn("flex-1 space-y-6 transition-all duration-300", activeLeadId ? 'lg:pr-[450px]' : '')}>
        <div className="flex flex-col gap-4 border-b border-border pb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">Leads Central</h2>
            <p className="text-xs text-muted-foreground">Manage and filter your inbound marketing leads.</p>
          </div>

          {/* Filtering Workspace controls */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-secondary/20 p-3 rounded-xl border border-border/60">
            {/* Search Input */}
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search leads name, email, company..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="w-full pl-3 pr-8 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-primary appearance-none cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Follow-Up">Follow-Up</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>

            {/* Source Filter */}
            <div className="relative">
              <select
                value={sourceFilter}
                onChange={(e) => { setSourceFilter(e.target.value); setCurrentPage(1); }}
                className="w-full pl-3 pr-8 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-primary appearance-none cursor-pointer"
              >
                <option value="ALL">All Sources</option>
                <option value="Meta Ads">Meta Ads</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Website Forms">Website Forms</option>
                <option value="CSV Upload">CSV Upload</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Lead Table Container */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-secondary/40 border-b border-border text-muted-foreground">
                  <th 
                    onClick={() => handleToggleSort('name')} 
                    className="p-4 font-bold uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  >
                    Name {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider">Phone</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Source</th>
                  <th 
                    onClick={() => handleToggleSort('score')} 
                    className="p-4 font-bold uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  >
                    AI Score {sortBy === 'score' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider">Status</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Owner</th>
                  <th 
                    onClick={() => handleToggleSort('createdAt')} 
                    className="p-4 font-bold uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                  >
                    Created {sortBy === 'createdAt' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {paginatedLeads.length > 0 ? (
                  paginatedLeads.map((lead) => {
                    const assignee = mockUsers.find(u => u.id === lead.assignedUserId);
                    const isSelected = lead.id === activeLeadId;
                    return (
                      <tr 
                        key={lead.id}
                        onClick={() => setActiveLeadId(isSelected ? null : lead.id)}
                        className={cn(
                          "hover:bg-secondary/20 cursor-pointer transition-colors border-l-2",
                          isSelected ? 'bg-secondary/35 border-l-primary' : 'border-l-transparent'
                        )}
                      >
                        <td className="p-4">
                          <span className="font-bold text-white block">{lead.name}</span>
                          <span className="text-[10px] text-muted-foreground">{lead.company}</span>
                        </td>
                        <td className="p-4 text-zinc-300 font-mono">{lead.phone}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-secondary/50 border border-border text-zinc-300">
                            {lead.source}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={cn("px-2 py-0.5 border rounded-full text-[10px] font-bold inline-flex items-center gap-1", getScoreColor(lead.score))}>
                            <Zap className="w-3 h-3 fill-current shrink-0" />
                            {lead.score}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border", getStatusBadge(lead.status))}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 text-zinc-400">
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[8px] font-bold uppercase">
                              {assignee?.name.charAt(0)}
                            </div>
                            <span className="text-[11px] font-medium">{assignee?.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground font-mono text-[10px]">
                          {formatDate(lead.createdAt)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <div className="max-w-sm mx-auto space-y-3">
                        <FileText className="w-8 h-8 text-zinc-700 mx-auto" />
                        <span className="font-semibold text-sm text-zinc-400 block">No leads match filters</span>
                        <p className="text-xs text-zinc-500">Refine your search input parameters or create a new lead manually.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="bg-secondary/10 px-4 py-3 flex items-center justify-between border-t border-border/80">
              <span className="text-[10px] text-muted-foreground">
                Showing {Math.min(filteredLeads.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredLeads.length, currentPage * itemsPerPage)} of {filteredLeads.length} leads
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="p-1 border border-zinc-800 rounded hover:border-zinc-700 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-zinc-300">{currentPage} of {totalPages}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="p-1 border border-zinc-800 rounded hover:border-zinc-700 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Side-Drawer Pane */}
      {activeLead && (
        <div className="fixed right-0 top-16 bottom-0 w-full lg:w-[450px] bg-card border-l border-border z-30 shadow-2xl flex flex-col justify-between animate-fade-in">
          {/* Drawer Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{activeLead.name}</span>
                <span className={cn("px-2.5 py-0.5 rounded-full text-[9px] font-bold border", getScoreBadge(activeLead.score).bg)}>
                  {getScoreBadge(activeLead.score).label}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">{activeLead.company || 'Private Owner'}</p>
            </div>
            <button 
              onClick={() => setActiveLeadId(null)}
              className="p-1.5 border border-zinc-800 hover:border-zinc-700 rounded-lg text-muted-foreground hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body Scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Quick Actions Panel */}
            <div className="grid grid-cols-2 gap-2 bg-secondary/10 p-3 rounded-lg border border-border/40">
              {/* Lead Status Selector */}
              <div>
                <label className="text-[8px] uppercase tracking-wider text-muted-foreground font-bold block mb-1">Status</label>
                <select
                  value={activeLead.status}
                  onChange={(e) => updateLeadStatus(activeLead.id, e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-[11px] text-zinc-300 focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Follow-Up">Follow-Up</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              {/* Owner Reassign Selector */}
              <div>
                <label className="text-[8px] uppercase tracking-wider text-muted-foreground font-bold block mb-1">Assign Owner</label>
                <select
                  value={activeLead.assignedUserId}
                  onChange={(e) => updateLeadOwner(activeLead.id, e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-[11px] text-zinc-300 focus:outline-none"
                >
                  {mockUsers.map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Profile Info Details */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-border pb-1">Profile Details</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-mono">{activeLead.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="truncate">{activeLead.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-400">
                  <Building className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{activeLead.company || 'Not Specified'}</span>
                </div>
                {activeLead.budget && (
                  <div className="flex items-center gap-2.5 text-zinc-400 font-semibold text-primary">
                    <Award className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Budget: {activeLead.budget}</span>
                  </div>
                )}
              </div>
            </div>

            {/* AI Conversation Q&A answers */}
            {activeLead.qaList && activeLead.qaList.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-border pb-1">AI Qualification Q&A</h4>
                <div className="space-y-2">
                  {activeLead.qaList.map((qa, i) => (
                    <div key={i} className="bg-zinc-900 border border-zinc-800/80 p-2.5 rounded-lg space-y-1">
                      <span className="text-[10px] text-zinc-500 block font-semibold">Q: {qa.question}</span>
                      <span className="text-xs text-white block font-medium">A: {qa.answer}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Note taking workspace */}
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-border pb-1">Notes Workspace</h4>
              
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a meeting note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white focus:outline-none focus:border-primary"
                />
                <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs px-3 rounded font-semibold transition-colors">
                  Add
                </button>
              </form>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {activeLead.notes.length > 0 ? (
                  activeLead.notes.map((note) => (
                    <div key={note.id} className="p-2 border border-border rounded-lg text-[11px] bg-secondary/10">
                      <p className="text-zinc-300 font-medium">{note.content}</p>
                      <div className="flex justify-between items-center mt-1.5 text-[9px] text-muted-foreground font-mono">
                        <span>{note.author}</span>
                        <span>{formatDate(note.createdAt)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-[10px] text-muted-foreground italic block">No notes added.</span>
                )}
              </div>
            </div>

            {/* Log Call Section */}
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-border pb-1">Outbound Call Logger</h4>
              
              <form onSubmit={handleLogCall} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Brief call description..."
                    value={newCallDesc}
                    onChange={(e) => setNewCallDesc(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g. 5m)"
                    value={newCallDuration}
                    onChange={(e) => setNewCallDuration(e.target.value)}
                    className="w-24 bg-zinc-900 border border-zinc-800 rounded p-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <button type="submit" className="w-full bg-secondary border border-border hover:border-zinc-700 text-white font-medium text-xs py-1.5 rounded flex items-center justify-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-primary" />
                  <span>Log Outbound Call</span>
                </button>
              </form>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {activeLead.callLogs.length > 0 ? (
                  activeLead.callLogs.map((log) => (
                    <div key={log.id} className="p-2 border border-border rounded-lg text-[11px] bg-secondary/10 flex items-start gap-2">
                      <PhoneCall className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-zinc-300 font-medium">{log.description}</p>
                        <div className="flex justify-between items-center mt-1.5 text-[9px] text-muted-foreground font-mono">
                          <span>{log.author} ({log.duration})</span>
                          <span>{formatDate(log.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-[10px] text-muted-foreground italic block">No calls logged.</span>
                )}
              </div>
            </div>

            {/* Timeline Stream */}
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-border pb-1">Activity Timeline</h4>
              
              <div className="relative border-l border-zinc-800 ml-2 pl-4 space-y-4">
                {activeLead.timeline.map((event) => (
                  <div key={event.id} className="relative text-[11px] group">
                    <div className="absolute -left-[21px] top-1 w-1.5 h-1.5 rounded-full bg-zinc-700 border border-zinc-950 group-hover:bg-primary" />
                    <span className="font-bold text-white block">{event.title}</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{event.description}</p>
                    <span className="text-[9px] text-zinc-500 block font-mono mt-0.5">{formatDate(event.createdAt)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delete Action Footer */}
          <div className="p-4 border-t border-border bg-secondary/15 flex justify-end">
            <button
              onClick={() => {
                if (confirm(`Delete lead ${activeLead.name}?`)) {
                  deleteLead(activeLead.id);
                  setActiveLeadId(null);
                }
              }}
              className="text-xs text-destructive hover:bg-destructive/15 border border-destructive/20 px-3 py-1.5 rounded font-semibold transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Lead Record</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LeadsPage() {
  return (
    <Suspense fallback={
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <LeadsContent />
    </Suspense>
  );
}
