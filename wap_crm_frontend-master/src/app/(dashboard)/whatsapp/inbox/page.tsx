'use client';

import React, { useState } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { useLeadsStore } from '@/store/useLeadsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  Search, 
  Send, 
  Sparkles, 
  Clock, 
  FileText, 
  Users, 
  TrendingUp, 
  Check, 
  CheckCheck,
  Calendar,
  AlertCircle,
  Loader2,
  UserPlus,
  BookmarkCheck,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { formatTime, cn } from '@/lib/utils';
import { MessageTemplate } from '@/mock/mockMessages';

export default function WhatsAppInbox() {
  const { 
    chats, 
    activeChatId, 
    setActiveChatId, 
    sendMessage, 
    toggleAiMode, 
    templates 
  } = useChatStore();

  const { leads, updateLeadStatus } = useLeadsStore();
  const { user } = useAuthStore();

  // Chat sub-states
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [aiFilterOnly, setAiFilterOnly] = useState(false);
  
  // Follow up scheduling state
  const [scheduledText, setScheduledText] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduledLogs, setScheduledLogs] = useState<{ id: string, text: string, time: string }[]>([]);

  // Notes state
  const [noteText, setNoteText] = useState('');
  const [notesList, setNotesList] = useState<Record<string, string[]>>({
    'l-1': ['Looking for premium WhatsApp API onboarding services.', 'Prefers email for contracts.'],
    'l-2': ['Needs quick rollout before next campaign launch.', 'Budget constraints exist.'],
    'l-3': ['Requested demo on Google Meet.', 'Very interested in AI automated screening.']
  });

  // Salesperson assignment mock
  const [assignedSales, setAssignedSales] = useState<Record<string, string>>({
    'l-1': 'Sarah Jenkins',
    'l-2': 'David Miller',
    'l-3': 'Unassigned'
  });
  const [isAssigning, setIsAssigning] = useState(false);

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

  const addNote = () => {
    if (!activeChatId || !noteText.trim()) return;
    const currentNotes = notesList[activeChatId] || [];
    setNotesList({
      ...notesList,
      [activeChatId]: [...currentNotes, noteText]
    });
    setNoteText('');
  };

  const handleAssignSales = (salesperson: string) => {
    if (!activeChatId) return;
    setAssignedSales({
      ...assignedSales,
      [activeChatId]: salesperson
    });
    setIsAssigning(false);
  };

  const handleMarkQualified = () => {
    if (!activeChatId) return;
    if (updateLeadStatus) {
      updateLeadStatus(activeChatId, 'Qualified');
    }
    alert('Lead marked as Qualified successfully!');
  };

  const handleCloseLead = () => {
    if (!activeChatId) return;
    if (updateLeadStatus) {
      updateLeadStatus(activeChatId, 'Lost');
    }
    alert('Lead marked as Closed/Lost.');
  };

  return (
    <div className="h-[calc(100vh-190px)] flex -m-6 divide-x divide-border">
      {/* 1. Left List Pane */}
      <div className="w-72 flex flex-col shrink-0 bg-secondary/5 h-full">
        {/* Search list Header */}
        <div className="p-4 border-b border-border space-y-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-xs text-foreground placeholder-zinc-500 focus:outline-none"
            />
          </div>
          
          {/* Filter Selector Switch */}
          <button
            onClick={() => setAiFilterOnly(!aiFilterOnly)}
            className={cn(
              "w-full py-1.5 border rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1.5",
              aiFilterOnly 
                ? 'bg-primary/10 border-primary/40 text-primary' 
                : 'bg-muted border-border text-muted-foreground hover:text-muted-foreground'
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
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold uppercase text-muted-foreground shrink-0 font-sans">
                    {chat.leadName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs truncate text-foreground">{chat.leadName}</span>
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
      <div className="flex-1 flex flex-col h-full bg-card">
        {activeChat ? (
          <>
            {/* Chat Window Header */}
            <div className="px-6 py-3 border-b border-border/80 bg-secondary/15 flex items-center justify-between shrink-0">
              <div>
                <span className="font-bold text-xs text-foreground block">{activeChat.leadName}</span>
                <span className="text-[9px] text-muted-foreground font-mono block mt-0.5">{activeChat.phone}</span>
              </div>

              {/* AI Copilot toggler */}
              <div className="flex items-center gap-3 bg-muted border border-border px-3.5 py-1.5 rounded-lg">
                <div className="flex items-center gap-1.5">
                  <Sparkles className={cn("w-3.5 h-3.5", activeChat.aiMode ? 'text-primary' : 'text-muted-foreground')} />
                  <span className="text-[10px] font-bold text-muted-foreground">AI Auto-Reply</span>
                </div>
                <button
                  onClick={() => toggleAiMode(activeChat.leadId)}
                  className={cn(
                    "w-8 h-4 rounded-full relative transition-colors flex items-center p-0.5",
                    activeChat.aiMode ? 'bg-primary' : 'border-border bg-zinc-600'
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
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background/5">
              {activeChat.messages.map((m) => {
                const isAgent = m.sender === 'agent';
                const isAi = m.sender === 'ai';
                const isLead = m.sender === 'lead';
                const isSystem = m.sender === 'system';

                if (isSystem) {
                  return (
                    <div key={m.id} className="flex justify-center my-2">
                      <span className="bg-secondary border border-border/60 text-muted-foreground text-[9px] font-semibold px-3 py-1 rounded-full font-mono uppercase">
                        {m.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div 
                    key={m.id} 
                    className={cn(
                      "flex flex-col max-w-[70%] space-y-0.5",
                      isLead ? 'mr-auto items-start' : 'ml-auto items-end'
                    )}
                  >
                    <div className={cn(
                      "p-3 rounded-2xl text-xs leading-relaxed",
                      isLead 
                        ? 'bg-muted/80 text-foreground rounded-tl-none border border-border' 
                        : isAi
                          ? 'bg-secondary text-primary border border-primary/20 rounded-tr-none'
                          : 'bg-primary text-black font-semibold rounded-tr-none'
                    )}>
                      <p>{m.text}</p>
                    </div>
                    
                    {/* Message Footer Info */}
                    <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-muted-foreground font-mono">
                      <span>{isAi ? 'AI Copilot' : isAgent ? 'You' : 'Lead'}</span>
                      <span>•</span>
                      <span>{formatTime(m.timestamp)}</span>
                      {(!isLead && m.status) && (
                        <span>
                          {m.status === 'read' ? (
                            <CheckCheck className="w-3.5 h-3.5 text-primary inline" />
                          ) : m.status === 'delivered' ? (
                            <CheckCheck className="w-3.5 h-3.5 text-muted-foreground inline" />
                          ) : (
                            <Check className="w-3.5 h-3.5 text-muted-foreground inline" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-border/80 bg-card flex gap-2 shrink-0">
              <input
                type="text"
                placeholder={activeChat.aiMode ? "AI is replying automatically. Type to override..." : "Type your message..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-muted border border-border rounded-lg px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/95 text-black font-bold p-2.5 rounded-lg transition-colors shrink-0 flex items-center justify-center"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <AlertCircle className="w-8 h-8 text-zinc-700 mb-2" />
            <span className="text-xs font-semibold text-muted-foreground">No Chat Selected</span>
            <p className="text-[10px] text-muted-foreground max-w-xs mt-1">Select an active conversation thread from the inbox.</p>
          </div>
        )}
      </div>

      {/* 3. Right Panel Context utilities */}
      <div className="w-76 shrink-0 h-full bg-secondary/5 overflow-y-auto p-4 space-y-5">
        {activeChat ? (
          <>
            {/* Quick Action Buttons */}
            <div className="space-y-2">
              <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground block border-b border-border pb-1">Quick Actions</span>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsAssigning(!isAssigning)}
                  className="bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-1.5 px-2 rounded text-[10px] flex items-center justify-center gap-1 border border-border"
                >
                  <UserPlus className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Assign Lead</span>
                </button>
                <button
                  onClick={handleMarkQualified}
                  className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-semibold py-1.5 px-2 rounded text-[10px] flex items-center justify-center gap-1"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Mark Qualified</span>
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('follow-up-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-1.5 px-2 rounded text-[10px] flex items-center justify-center gap-1 border border-border"
                >
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Schedule Call</span>
                </button>
                <button
                  onClick={handleCloseLead}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/25 font-semibold py-1.5 px-2 rounded text-[10px] flex items-center justify-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Close Lead</span>
                </button>
              </div>

              {isAssigning && (
                <div className="bg-card border border-border p-2 rounded mt-2 space-y-1.5">
                  <span className="text-[8px] uppercase font-bold text-muted-foreground block">Select Representative</span>
                  <div className="flex flex-col gap-1 text-[10px]">
                    {['Sarah Jenkins', 'David Miller', 'Clara Vance', 'Marc Jacobs'].map(name => (
                      <button
                        key={name}
                        onClick={() => handleAssignSales(name)}
                        className="text-left py-1 px-2 rounded hover:bg-secondary/60 text-muted-foreground hover:text-foreground font-medium"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Lead Score & Context */}
            <div className="space-y-3">
              <h4 className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground border-b border-border pb-1">AI Lead Profile</h4>
              
              <div className="border border-border p-3 rounded-lg bg-card text-xs space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">{activeChat.leadName}</span>
                  {activeLead?.score && (
                    <span className={cn(
                      "px-2 py-0.5 rounded-full font-bold text-[9px] border",
                      activeLead.score >= 80 
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : activeLead.score >= 50 
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-red-500/10 text-red-500 border-red-500/20"
                    )}>
                      Score: {activeLead.score}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-b border-border/60 py-2">
                  <div>
                    <span className="text-muted-foreground block">Assigned Representative</span>
                    <span className="font-semibold text-foreground">{assignedSales[activeChat.leadId] || 'Unassigned'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Budget Bracket</span>
                    <span className="font-semibold text-foreground font-mono">{activeLead?.budget || 'Undefined'}</span>
                  </div>
                </div>

                {/* Qualification Questions */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Qualification Answers:</span>
                  <div className="space-y-1.5 text-[10px]">
                    <div className="bg-secondary/40 p-2 rounded">
                      <span className="text-muted-foreground block">Looking for service:</span>
                      <span className="font-semibold text-foreground">AI Automation Solutions</span>
                    </div>
                    <div className="bg-secondary/40 p-2 rounded">
                      <span className="text-muted-foreground block">Expected purchasing window:</span>
                      <span className="font-semibold text-foreground">Within 30 Days</span>
                    </div>
                    <div className="bg-secondary/40 p-2 rounded">
                      <span className="text-muted-foreground block">Demanded Product Demo call:</span>
                      <span className="font-semibold text-foreground">Yes, scheduled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Insertion */}
            <div className="space-y-3">
              <h4 className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground border-b border-border pb-1">Insert Qualification Templates</h4>
              
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {templates.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleInsertTemplate(t.body)}
                    className="w-full text-left p-2 border border-border/60 hover:border-primary/40 bg-card rounded text-[10px] font-medium text-muted-foreground hover:text-foreground transition-all block truncate"
                    title={t.body}
                  >
                    <span className="font-bold block text-primary mb-0.5">{t.name}</span>
                    {t.body}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Notes */}
            <div className="space-y-3">
              <h4 className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground border-b border-border pb-1">Customer Notes</h4>
              
              <div className="space-y-2">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Add a customer note..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="flex-1 bg-muted border border-border rounded p-1.5 text-[10px] text-foreground focus:outline-none"
                  />
                  <button
                    onClick={addNote}
                    className="bg-secondary text-foreground hover:bg-secondary/80 border border-border text-[10px] font-bold px-2 rounded"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {(notesList[activeChat.leadId] || []).map((note, index) => (
                    <div key={index} className="p-2 border border-border/60 rounded bg-card text-[10px] text-muted-foreground italic leading-normal">
                      "{note}"
                    </div>
                  ))}
                  {(notesList[activeChat.leadId] || []).length === 0 && (
                    <p className="text-[10px] text-muted-foreground italic text-center py-2">No notes added yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Schedule Follow-up */}
            <div id="follow-up-form" className="space-y-3">
              <h4 className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground border-b border-border pb-1">Schedule Follow-up</h4>
              
              <form onSubmit={handleScheduleFollowup} className="space-y-2 bg-card border border-border p-3 rounded-lg">
                <div>
                  <label className="text-[8px] uppercase font-bold tracking-wider text-muted-foreground block mb-0.5">Message text</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Just checking in..."
                    value={scheduledText}
                    onChange={(e) => setScheduledText(e.target.value)}
                    className="w-full bg-muted border border-border rounded p-1.5 text-[10px] text-foreground focus:outline-none"
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
                      className="w-full bg-muted border border-border rounded p-1 text-[10px] text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] uppercase font-bold tracking-wider text-muted-foreground block mb-0.5">Time</label>
                    <input
                      type="time"
                      required
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full bg-muted border border-border rounded p-1 text-[10px] text-foreground"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary text-black font-semibold text-[10px] py-1.5 rounded flex items-center justify-center gap-1 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-black" />
                  <span>Schedule Message</span>
                </button>
              </form>

              {/* Scheduled Lists logs */}
              {scheduledLogs.length > 0 && (
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {scheduledLogs.map(log => (
                    <div key={log.id} className="p-2 border border-border/80 rounded bg-muted text-[9px] space-y-0.5">
                      <p className="text-muted-foreground font-medium truncate">{log.text}</p>
                      <span className="text-muted-foreground font-mono block">Sends at: {log.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-xs text-muted-foreground">
            Select a chat thread to view context and actions.
          </div>
        )}
      </div>
    </div>
  );
}
