'use client';

import React, { useState } from 'react';
import { useLeadsStore } from '@/store/useLeadsStore';
import { 
  Users, 
  Search, 
  Filter, 
  Trash2, 
  Tag, 
  UserCheck, 
  MoreVertical, 
  Download,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WhatsAppContacts() {
  const { leads, deleteLead } = useLeadsStore();

  // If local leads store is empty, define standard fallback mock contacts for display
  const displayLeads = leads.length > 0 ? leads : [
    { id: 'l-1', name: 'John Doe', phone: '+1 555-019-2834', source: 'Meta Ads', score: 85, status: 'Qualified', createdAt: '2026-07-20T10:00:00Z', budget: 'Over $50K' },
    { id: 'l-2', name: 'Alice Smith', phone: '+1 555-014-9982', source: 'Google Ads', score: 62, status: 'Contacted', createdAt: '2026-07-21T12:30:00Z', budget: '$10K - $30K' },
    { id: 'l-3', name: 'Robert Johnson', phone: '+1 555-017-7721', source: 'Website Forms', score: 35, status: 'New', createdAt: '2026-07-22T08:15:00Z', budget: 'Under $10K' },
    { id: 'l-4', name: 'Emily Davis', phone: '+1 555-018-8832', source: 'CSV Upload', score: 92, status: 'Qualified', createdAt: '2026-07-23T15:45:00Z', budget: 'Over $50K' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkTagInput, setBulkTagInput] = useState('');
  const [showBulkTagModal, setShowBulkTagModal] = useState(false);

  // Mock tags for contacts
  const [contactTags, setContactTags] = useState<Record<string, string[]>>({
    'l-1': ['VIP', 'Enterprise'],
    'l-2': ['Follow-up', 'Retail'],
    'l-3': ['Inbound'],
    'l-4': ['Hot-lead', 'SaaS']
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredLeads.map(l => l.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(item => item !== id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} contact(s)?`)) {
      selectedIds.forEach(id => {
        if (deleteLead) deleteLead(id);
      });
      setSelectedIds([]);
      alert('Contacts deleted successfully!');
    }
  };

  const handleApplyBulkTag = () => {
    if (!bulkTagInput.trim()) return;
    const updatedTags = { ...contactTags };
    selectedIds.forEach(id => {
      const tags = updatedTags[id] || [];
      if (!tags.includes(bulkTagInput)) {
        updatedTags[id] = [...tags, bulkTagInput];
      }
    });
    setContactTags(updatedTags);
    setBulkTagInput('');
    setShowBulkTagModal(false);
    setSelectedIds([]);
    alert('Tags applied successfully to selected contacts!');
  };

  const filteredLeads = displayLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.phone.includes(searchQuery);
    const matchesSource = selectedSource === 'All' || lead.source === selectedSource;
    const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
    return matchesSearch && matchesSource && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Contact Management</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your synchronized WhatsApp customer profiles, qualification stages, and labels.
          </p>
        </div>
      </div>

      {/* Filter and Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-secondary/5 border border-border p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-xs text-foreground placeholder-zinc-500 focus:outline-none"
            />
          </div>

          {/* Source filter */}
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground focus:outline-none"
          >
            <option value="All">All Sources</option>
            <option value="Meta Ads">Meta Ads</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Website Forms">Website Forms</option>
            <option value="CSV Upload">CSV Upload</option>
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Follow-Up">Follow-Up</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {/* Bulk Action Controls */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-lg text-xs animate-fade-in shrink-0">
            <span className="font-bold text-primary mr-2">{selectedIds.length} selected</span>
            <button
              onClick={() => setShowBulkTagModal(true)}
              className="bg-primary text-black font-semibold px-2.5 py-1 rounded text-[10px] flex items-center gap-1 hover:bg-primary/95 transition-all"
            >
              <Tag className="w-3 h-3" />
              <span>Bulk Tag</span>
            </button>
            <button
              onClick={handleBulkDelete}
              className="bg-red-500/20 text-red-400 border border-red-500/20 font-semibold px-2.5 py-1 rounded text-[10px] flex items-center gap-1 hover:bg-red-500/30 transition-all"
            >
              <Trash2 className="w-3 h-3" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Contacts Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 text-muted-foreground font-semibold bg-secondary/5">
                <th className="p-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredLeads.length && filteredLeads.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border text-primary focus:ring-primary w-4 h-4 bg-muted"
                  />
                </th>
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Phone Number</th>
                <th className="p-3.5">Tags</th>
                <th className="p-3.5">Lead Source</th>
                <th className="p-3.5">Qualification Status</th>
                <th className="p-3.5">Last Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredLeads.map((lead) => {
                const isChecked = selectedIds.includes(lead.id);
                const tags = contactTags[lead.id] || [];

                return (
                  <tr key={lead.id} className={cn("hover:bg-secondary/10 transition-colors", isChecked && "bg-primary/5")}>
                    <td className="p-3.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleSelectRow(lead.id, e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary w-4 h-4 bg-muted"
                      />
                    </td>
                    <td className="p-3.5 font-bold text-foreground">{lead.name}</td>
                    <td className="p-3.5 font-mono text-muted-foreground">{lead.phone}</td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tg, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-secondary text-muted-foreground font-semibold rounded text-[9px] border border-border">
                            {tg}
                          </span>
                        ))}
                        {tags.length === 0 && <span className="text-[10px] text-muted-foreground italic">None</span>}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-secondary text-foreground rounded font-semibold border border-border text-[9px]">
                        {lead.source}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border",
                        lead.status === 'Qualified' || lead.status === 'Won'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : lead.status === 'Lost'
                            ? 'bg-red-500/10 text-red-500 border-red-500/20'
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      )}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-muted-foreground font-mono">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-muted-foreground">
                    No contacts match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Tag Dialog Modal */}
      {showBulkTagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-xl p-5 max-w-sm w-full relative animate-fade-in space-y-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Apply Bulk Tag</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Apply a new tag to the {selectedIds.length} selected contact(s).</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Tag Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. VIP-Lead"
                  value={bulkTagInput}
                  onChange={(e) => setBulkTagInput(e.target.value.replace(/\s+/g, '-'))}
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setShowBulkTagModal(false)}
                className="px-4 py-2 border border-border text-xs font-semibold rounded-lg text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyBulkTag}
                disabled={!bulkTagInput.trim()}
                className="px-4 py-2 bg-primary text-black font-semibold rounded-lg text-xs hover:bg-primary/95 disabled:opacity-50"
              >
                Apply Tag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
