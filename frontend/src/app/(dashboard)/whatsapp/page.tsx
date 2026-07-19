'use client';

import React, { useState, useEffect } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { useLeadsStore } from '@/store/useLeadsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  Search, 
  Send, 
  Sparkles, 
  Clock, 
  FileText, 
  SendHorizontal, 
  Users, 
  TrendingUp, 
  Check, 
  CheckCheck,
  Plus,
  MessageCircle,
  Megaphone,
  Layers,
  Settings,
  Calendar,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { formatTime, cn } from '@/lib/utils';
import { MessageTemplate } from '@/mock/mockMessages';

export default function WhatsAppCrm() {
  const { 
    chats, 
    activeChatId, 
    setActiveChatId, 
    sendMessage, 
    toggleAiMode, 
    campaigns, 
    launchCampaign, 
    templates, 
    addTemplate 
  } = useChatStore();

  const { leads, fetchLeads } = useLeadsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Navigation tab (Chats vs Broadcasts vs Templates)
  const [activeTab, setActiveTab] = useState<'chats' | 'broadcast' | 'templates'>('chats');
  
  // Chat sub-states
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [aiFilterOnly, setAiFilterOnly] = useState(false);
  const [selectedTemplateText, setSelectedTemplateText] = useState('');
  
  // Follow up scheduling state
  const [scheduledText, setScheduledText] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduledLogs, setScheduledLogs] = useState<{ id: string, text: string, time: string }[]>([]);

  // Campaign builder state
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [campaignTemplateId, setCampaignTemplateId] = useState('');
  const [launchingCampaign, setLaunchingCampaign] = useState(false);

  // Template builder state
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateForm, setTemplateForm] = useState({ name: '', category: 'Qualification' as any, body: '' });

  const activeChat = chats.find(c => c.leadId === activeChatId);
  const activeLead = leads.find(l => l.id === activeChatId);

  // Filter chats logic
  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.leadName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          chat.phone.includes(searchQuery);
    const matchesAi = !aiFilterOnly || chat.aiMode;
    return matchesSearch && matchesAi;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatId) return;
    sendMessage(activeChatId, inputMessage, 'agent');
    setInputMessage('');
  };

  const handleInsertTemplate = (body: string) => {
    if (!activeChat) return;
    // Replace mockup variables
    const formatted = body.replace('{{name}}', activeChat.leadName);
    setInputMessage(formatted);
  };

  const handleScheduleFollowup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduledText.trim() || !scheduledDate || !scheduledTime) return;
    
    const newLog = {
      id: `sch-${Date.now()}`,
      text: scheduledText,
      time: `${scheduledDate} at ${scheduledTime}`
    };

    setScheduledLogs([newLog, ...scheduledLogs]);
    setScheduledText('');
    setScheduledDate('');
    setScheduledTime('');
    alert(`Mock Follow-up Scheduled! Message will send on ${newLog.time}`);
  };

  const handleLaunchCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignName.trim() || !campaignTemplateId) return;
    
    setLaunchingCampaign(true);
    await launchCampaign(campaignName, campaignTemplateId);
    setLaunchingCampaign(false);
    setShowBroadcastModal(false);
    setCampaignName('');
    setCampaignTemplateId('');
    alert('Campaign Broadcast Dispatched Successfully!');
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateForm.name.trim() || !templateForm.body.trim()) return;
    addTemplate(templateForm);
    setShowTemplateModal(false);
    setTemplateForm({ name: '', category: 'Qualification', body: '' });
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-4">
      {/* Sub Header Navigation */}
      <div className="flex items-center justify-between border-b border-border pb-3 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('chats')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all",
              activeTab === 'chats' ? 'bg-primary text-black' : 'text-zinc-400 hover:text-white hover:bg-secondary/40'
            )}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Conversations</span>
          </button>
          <button 
            onClick={() => setActiveTab('broadcast')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all",
              activeTab === 'broadcast' ? 'bg-primary text-black' : 'text-zinc-400 hover:text-white hover:bg-secondary/40'
            )}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Campaign Broadcasts</span>
          </button>
          <button 
            onClick={() => setActiveTab('templates')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all",
              activeTab === 'templates' ? 'bg-primary text-black' : 'text-zinc-400 hover:text-white hover:bg-secondary/40'
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Templates</span>
          </button>
        </div>

        {activeTab === 'broadcast' && (
          <button
            onClick={() => setShowBroadcastModal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-lg shadow-primary/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Create Campaign</span>
          </button>
        )}

        {activeTab === 'templates' && (
          <button
            onClick={() => setShowTemplateModal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-lg shadow-primary/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Create Template</span>
          </button>
        )}
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 min-h-0 bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        {/* VIEW 1: Conversations Workspace */}
        {activeTab === 'chats' && (
          <div className="h-full flex divide-x divide-border">
            {/* 1. Left List Pane */}
            <div className="w-80 flex flex-col shrink-0 bg-secondary/5 h-full">
              {/* Search list Header */}
              <div className="p-4 border-b border-border/80 space-y-3 shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>
                
                {/* Filter Selector Switch */}
                <button
                  onClick={() => setAiFilterOnly(!aiFilterOnly)}
                  className={cn(
                    "w-full py-1.5 border rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1.5",
                    aiFilterOnly 
                      ? 'bg-primary/10 border-primary/40 text-primary' 
                      : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  )}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Copilot Active threads only</span>
                </button>
              </div>

              {/* Threads Roll list */}
              <div className="flex-1 overflow-y-auto divide-y divide-border/40">
                {filteredChats.length > 0 ? (
                  filteredChats.map((chat) => {
                    const isSelected = chat.leadId === activeChatId;
                    return (
                      <div
                        key={chat.leadId}
                        onClick={() => setActiveChatId(chat.leadId)}
                        className={cn(
                          "p-3.5 hover:bg-secondary/20 cursor-pointer flex gap-3 transition-colors border-l-2",
                          isSelected ? 'bg-secondary/35 border-l-primary' : 'border-l-transparent'
                        )}
                      >
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold uppercase text-zinc-300 shrink-0">
                          {chat.leadName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs truncate text-white">{chat.leadName}</span>
                            <span className="text-[9px] text-muted-foreground font-mono">
                              {formatTime(chat.timestamp)}
                            </span>
                          </div>
                          <p className="text-[10px] text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
                          <div className="flex items-center justify-between mt-1">
                            {chat.aiMode ? (
                              <span className="inline-flex items-center gap-1 text-[9px] text-primary font-bold">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>AI Active</span>
                              </span>
                            ) : (
                              <div />
                            )}
                            {chat.unreadCount > 0 && (
                              <span className="px-1.5 py-0.5 text-[9px] bg-primary text-black font-extrabold rounded-full shrink-0">
                                {chat.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-xs text-muted-foreground">
                    No active chat threads
                  </div>
                )}
              </div>
            </div>

            {/* 2. Middle Message Window */}
            <div className="flex-1 flex flex-col h-full relative">
              {activeChat ? (
                <>
                  {/* Chat Window Header */}
                  <div className="px-6 py-3 border-b border-border/80 bg-secondary/15 flex items-center justify-between shrink-0">
                    <div>
                      <span className="font-bold text-xs text-white block">{activeChat.leadName}</span>
                      <span className="text-[9px] text-muted-foreground font-mono block mt-0.5">{activeChat.phone}</span>
                    </div>

                    {/* AI Copilot toggler */}
                    <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-lg">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className={cn("w-3.5 h-3.5", activeChat.aiMode ? 'text-primary' : 'text-zinc-600')} />
                        <span className="text-[10px] font-bold text-zinc-300">AI Auto-Reply</span>
                      </div>
                      <button
                        onClick={() => toggleAiMode(activeChat.leadId)}
                        className={cn(
                          "w-8 h-4 rounded-full relative transition-colors flex items-center p-0.5",
                          activeChat.aiMode ? 'bg-primary' : 'bg-zinc-700'
                        )}
                      >
                        <div className={cn(
                          "w-3 h-3 rounded-full bg-white transition-transform shadow",
                          activeChat.aiMode ? 'translate-x-4' : 'translate-x-0'
                        )} />
                      </button>
                    </div>
                  </div>

                  {/* Message Stream */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black/10">
                    {activeChat.messages.map((m) => {
                      const isAgent = m.sender === 'agent';
                      const isAi = m.sender === 'ai';
                      const isLead = m.sender === 'lead';
                      const isSystem = m.sender === 'system';

                      if (isSystem) {
                        return (
                          <div key={m.id} className="flex justify-center my-2">
                            <span className="bg-secondary/40 border border-border/60 text-muted-foreground text-[9px] font-semibold px-3 py-1 rounded-full font-mono uppercase">
                              {m.text}
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div 
                          key={m.id} 
                          className={cn(
                            "flex flex-col max-w-[70%]",
                            isLead ? 'mr-auto items-start' : 'ml-auto items-end'
                          )}
                        >
                          <div className={cn(
                            "p-3 rounded-2xl text-xs leading-relaxed",
                            isLead 
                              ? 'bg-zinc-900/90 text-white rounded-tl-none border border-zinc-800' 
                              : isAi
                                ? 'bg-secondary text-primary border border-primary/20 rounded-tr-none'
                                : 'bg-primary text-black font-semibold rounded-tr-none'
                          )}>
                            <p>{m.text}</p>
                          </div>
                          
                          {/* Message Footer Info */}
                          <div className="flex items-center gap-1.5 mt-1 text-[9px] text-muted-foreground font-mono">
                            <span>{isAi ? 'AI Copilot' : isAgent ? 'You' : 'Lead'}</span>
                            <span>•</span>
                            <span>{formatTime(m.timestamp)}</span>
                            {(!isLead && m.status) && (
                              <span>
                                {m.status === 'read' ? (
                                  <CheckCheck className="w-3.5 h-3.5 text-primary" />
                                ) : m.status === 'delivered' ? (
                                  <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />
                                ) : (
                                  <Check className="w-3.5 h-3.5 text-muted-foreground" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Message Input Area */}
                  <form onSubmit={handleSend} className="p-4 border-t border-border/80 bg-zinc-950 flex gap-2 shrink-0">
                    <input
                      type="text"
                      placeholder={activeChat.aiMode ? "AI is replying automatically. Type to override..." : "Type your message..."}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                    />
                    <button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/95 text-black font-bold p-2.5 rounded-lg transition-colors shrink-0 flex items-center justify-center"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <AlertCircle className="w-8 h-8 text-zinc-700 mb-2" />
                  <span className="text-xs font-semibold text-zinc-400">No Chat Selected</span>
                  <p className="text-[10px] text-zinc-500 max-w-xs mt-1">Select an active conversation thread from the inbox.</p>
                </div>
              )}
            </div>

            {/* 3. Right Panel Context utilities */}
            <div className="w-72 shrink-0 h-full bg-secondary/5 overflow-y-auto p-4 space-y-6">
              {activeChat ? (
                <>
                  {/* Lead Score context info */}
                  <div className="space-y-3">
                    <h4 className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 border-b border-border pb-1">AI Lead Profile</h4>
                    
                    <div className="border border-border p-3 rounded-lg bg-card text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white">{activeChat.leadName}</span>
                        {activeLead?.score && (
                          <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-full font-bold text-[9px]">
                            Score: {activeLead.score}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground block font-mono">{activeChat.phone}</span>
                      
                      {activeLead?.budget && (
                        <div className="text-[10px] text-zinc-400 pt-1">
                          <span className="font-bold block text-zinc-500">Budget Range</span>
                          <span className="text-white font-semibold">{activeLead.budget}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Template Quick Insert */}
                  <div className="space-y-3">
                    <h4 className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 border-b border-border pb-1">Qualification Templates</h4>
                    
                    <div className="space-y-1.5">
                      {templates.map(t => (
                        <button
                          key={t.id}
                          onClick={() => handleInsertTemplate(t.body)}
                          className="w-full text-left p-2 border border-border/60 hover:border-primary/40 bg-card rounded text-[10px] font-medium text-zinc-300 hover:text-white transition-all block truncate"
                          title={t.body}
                        >
                          <span className="font-bold block text-primary mb-0.5">{t.name}</span>
                          {t.body}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Follow-up message */}
                  <div className="space-y-3">
                    <h4 className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 border-b border-border pb-1">Schedule Follow-up</h4>
                    
                    <form onSubmit={handleScheduleFollowup} className="space-y-2 bg-card border border-border p-3 rounded-lg">
                      <div>
                        <label className="text-[8px] uppercase font-bold tracking-wider text-muted-foreground block mb-0.5">Message text</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Just checking in..."
                          value={scheduledText}
                          onChange={(e) => setScheduledText(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded p-1.5 text-[10px] text-white focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] uppercase font-bold tracking-wider text-muted-foreground block mb-0.5">Date</label>
                          <input
                            type="date"
                            required
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1 text-[10px] text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] uppercase font-bold tracking-wider text-muted-foreground block mb-0.5">Time</label>
                          <input
                            type="time"
                            required
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-1 text-[10px] text-white"
                          />
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-primary text-black font-semibold text-[10px] py-1.5 rounded flex items-center justify-center gap-1 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Schedule Message</span>
                      </button>
                    </form>

                    {/* Scheduled Lists logs */}
                    {scheduledLogs.length > 0 && (
                      <div className="space-y-1.5 max-h-32 overflow-y-auto">
                        {scheduledLogs.map(log => (
                          <div key={log.id} className="p-2 border border-zinc-800/80 rounded bg-zinc-900 text-[9px] space-y-0.5">
                            <p className="text-zinc-300 font-medium truncate">{log.text}</p>
                            <span className="text-zinc-500 font-mono block">Ends: {log.time}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-xs text-muted-foreground">
                  Select a chat thread to view utilities.
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: Broadcast Campaigns */}
        {activeTab === 'broadcast' && (
          <div className="p-6 space-y-6 h-full overflow-y-auto">
            <div>
              <span className="text-xs font-bold block">Broadcast Marketing campaigns</span>
              <span className="text-[10px] text-muted-foreground">Send mass template messages to lists of leads.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {campaigns.map((camp) => (
                <div key={camp.id} className="border border-border rounded-xl p-5 bg-secondary/10 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-white truncate max-w-[150px]">{camp.name}</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-bold uppercase",
                        camp.status === 'Completed' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      )}>
                        {camp.status}
                      </span>
                    </div>
                    <span className="text-[9px] text-muted-foreground block mt-1 font-mono">Template: {camp.templateName}</span>
                  </div>

                  {camp.status === 'Completed' && (
                    <div className="grid grid-cols-3 gap-2 text-center bg-zinc-900/60 p-2.5 rounded border border-border/40 text-[10px]">
                      <div>
                        <span className="text-[9px] text-zinc-500 block">Sent</span>
                        <span className="font-bold text-white mt-0.5 block">{camp.sentCount}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block">Delivered</span>
                        <span className="font-bold text-zinc-300 mt-0.5 block">{camp.deliveredCount}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block">Read</span>
                        <span className="font-bold text-primary mt-0.5 block">{camp.readCount}</span>
                      </div>
                    </div>
                  )}

                  {camp.status === 'Scheduled' && (
                    <div className="flex items-center gap-1.5 p-2 bg-zinc-900 border border-zinc-800 rounded text-[9px] text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Scheduled for {camp.scheduledFor ? new Date(camp.scheduledFor).toLocaleString() : ''}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: Templates Library */}
        {activeTab === 'templates' && (
          <div className="p-6 space-y-6 h-full overflow-y-auto">
            <div>
              <span className="text-xs font-bold block">Pre-defined Message Templates</span>
              <span className="text-[10px] text-muted-foreground">Create reusable pre-screening structures. Meta requires approvals in production.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((tpl) => (
                <div key={tpl.id} className="border border-border rounded-xl p-5 bg-secondary/10 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-white">{tpl.name}</span>
                      <span className="px-2 py-0.5 bg-secondary border border-border rounded text-[8px] font-semibold text-zinc-400">
                        {tpl.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 italic leading-relaxed mt-3 bg-zinc-900/40 p-3 rounded border border-border/40 font-mono">
                      {tpl.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Broadcast Designer Dialog Overlay */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 max-w-sm w-full relative animate-fade-in">
            <h3 className="text-sm font-bold">Launch Campaign Broadcast</h3>
            <p className="text-xs text-muted-foreground">Broadcast messages instantly to qualified lead pools.</p>

            <form onSubmit={handleLaunchCampaign} className="mt-4 space-y-4">
              <div>
                <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Campaign Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. August Casting Callout"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Select Message Template</label>
                <select
                  required
                  value={campaignTemplateId}
                  onChange={(e) => setCampaignTemplateId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-zinc-300 focus:outline-none"
                >
                  <option value="">Choose template...</option>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="px-4 py-2 border border-zinc-800 text-xs font-semibold rounded text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={launchingCampaign}
                  className="px-4 py-2 bg-primary text-black font-semibold rounded text-xs hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {launchingCampaign && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Launch Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Template Creator Dialog Overlay */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 max-w-sm w-full relative animate-fade-in">
            <h3 className="text-sm font-bold">Create New Template</h3>
            <p className="text-xs text-muted-foreground">Draft structures. Use `{"{{name}}"}` variable strings.</p>

            <form onSubmit={handleCreateTemplate} className="mt-4 space-y-4">
              <div>
                <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Template Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Casting Reminder"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Category</label>
                <select
                  value={templateForm.category}
                  onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value as any })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-zinc-300 focus:outline-none"
                >
                  <option value="Qualification">Qualification</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-1">Body Text Content</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Hi {{name}}, just following up..."
                  value={templateForm.body}
                  onChange={(e) => setTemplateForm({ ...templateForm, body: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-white focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 border border-zinc-800 text-xs font-semibold rounded text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-black font-semibold rounded text-xs hover:bg-primary/90"
                >
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
