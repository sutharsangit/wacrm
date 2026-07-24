'use client';

import React, { useState } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { 
  FileText, 
  Plus, 
  Search, 
  Loader2, 
  Eye, 
  CheckCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

export default function WhatsAppTemplates() {
  const { templates, addTemplate } = useChatStore();

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Marketing' | 'Utility' | 'Authentication'>('All');

  // Form state
  const [templateName, setTemplateName] = useState('');
  const [templateCategory, setTemplateCategory] = useState<'Marketing' | 'Utility' | 'Authentication'>('Marketing');
  const [templateBody, setTemplateBody] = useState('');

  const filteredTemplates = templates.filter(tpl => {
    const matchesSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tpl.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tpl.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName.trim() || !templateBody.trim()) return;

    addTemplate({
      name: templateName,
      category: templateCategory,
      body: templateBody
    });

    // Reset
    setTemplateName('');
    setTemplateCategory('Marketing');
    setTemplateBody('');
    setShowModal(false);
    alert('Template Draft Created & Sent for Meta Approval!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Message Templates</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Meta approved message templates. Templates are required to initiate outbound conversations with customers.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary/90 text-black font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-lg shadow-primary/10 transition-colors"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Create Template</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-xs text-foreground placeholder-zinc-500 focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 text-xs">
          {['All', 'Marketing', 'Utility', 'Authentication'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-3 py-1.5 font-bold rounded-lg border transition-all ${
                selectedCategory === cat 
                  ? 'bg-primary border-primary text-black' 
                  : 'bg-muted border-border text-muted-foreground hover:bg-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((tpl) => (
          <div key={tpl.id} className="border border-border rounded-xl p-5 bg-secondary/10 flex flex-col justify-between space-y-4 hover:border-primary/20 transition-all shadow-sm">
            <div>
              <div className="flex justify-between items-start">
                <span className="font-bold text-xs text-foreground truncate max-w-[150px]">{tpl.name}</span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-secondary border border-border rounded text-[8px] font-bold text-muted-foreground">
                    {tpl.category}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[8px] font-bold px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded">
                    <CheckCircle className="w-2.5 h-2.5" />
                    <span>Approved</span>
                  </span>
                </div>
              </div>
              
              <p className="text-[11px] text-muted-foreground italic leading-relaxed mt-4 bg-card p-3 rounded border border-border/40 font-mono">
                {tpl.body}
              </p>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-muted-foreground border-t border-border/40 pt-3">
              <span>Variables: {tpl.body.includes('{{name}}') ? '{{name}}' : 'None'}</span>
              <span className="font-mono">ID: {tpl.id}</span>
            </div>
          </div>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="col-span-full py-16 text-center text-xs text-muted-foreground bg-secondary/5 rounded-xl border border-border">
            No approved templates found matching your search.
          </div>
        )}
      </div>

      {/* Create Template Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl w-full relative animate-fade-in flex flex-col md:flex-row gap-6">
            
            {/* Left: Input Form */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">Create Message Template</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Submit template draft to Meta for API approval.</p>
              </div>

              <form onSubmit={handleCreateTemplate} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Template Identifier Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. registration_alert"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                  />
                  <span className="text-[9px] text-muted-foreground mt-0.5 block">Use lowercase and underscores only.</span>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Category Type</label>
                  <select
                    value={templateCategory}
                    onChange={(e) => setTemplateCategory(e.target.value as any)}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Utility">Utility</option>
                    <option value="Authentication">Authentication</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground block">Template Body Content</label>
                    <span className="text-[9px] text-muted-foreground">Use `{"{{name}}"}` for recipient name.</span>
                  </div>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Hi {{name}}, thanks for requesting details. Are you available for a demo call?"
                    value={templateBody}
                    onChange={(e) => setTemplateBody(e.target.value)}
                    className="w-full bg-muted border border-border rounded-lg p-3 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-border text-xs font-semibold rounded-lg text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!templateName.trim() || !templateBody.trim()}
                    className="px-4 py-2 bg-primary text-black font-semibold rounded-lg text-xs hover:bg-primary/95 disabled:opacity-50"
                  >
                    Submit Template
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Live Simulated Preview */}
            <div className="w-full md:w-64 bg-secondary/10 border border-border rounded-xl p-4 flex flex-col justify-between shrink-0 h-80">
              <div className="space-y-3">
                <span className="text-[9px] uppercase font-bold text-primary flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Mobile Preview</span>
                </span>
                
                {/* Simulated Chat bubble */}
                <div className="bg-card border border-border rounded-xl p-3 shadow-md space-y-1 mt-2">
                  <p className="text-[11px] text-foreground leading-normal whitespace-pre-wrap break-words font-mono">
                    {templateBody ? templateBody.replace('{{name}}', 'John Doe') : 'Hi John Doe, [Draft message content will render here...]'}
                  </p>
                  <span className="text-[8px] text-muted-foreground font-mono block text-right">09:41 AM</span>
                </div>
              </div>

              {/* Approval status banner */}
              <div className="bg-card border border-border/80 p-3 rounded-lg text-center space-y-1">
                <div className="flex justify-center items-center gap-1 text-[9px] font-bold text-amber-500">
                  <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  <span>Awaiting Review</span>
                </div>
                <p className="text-[8px] text-muted-foreground">Approval takes ~2 minutes once submitted.</p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
