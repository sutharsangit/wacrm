import { create } from 'zustand';
import { Lead, mockLeads, LeadStatus, LeadNote, CallLog, TimelineEvent } from '../mock/mockLeads';

interface LeadsState {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'callLogs' | 'timeline' | 'qaList'>) => void;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  updateLeadOwner: (leadId: string, userId: string) => void;
  addNoteToLead: (leadId: string, noteContent: string, author: string) => void;
  logCallForLead: (leadId: string, duration: string, description: string, author: string) => void;
  deleteLead: (leadId: string) => void;
  getLeadById: (leadId: string) => Lead | undefined;
}

export const useLeadsStore = create<LeadsState>((set, get) => {
  // Load initial leads from localStorage if available
  let initialLeads = mockLeads;
  if (typeof window !== 'undefined') {
    try {
      const savedLeads = localStorage.getItem('crm_leads');
      if (savedLeads) {
        initialLeads = JSON.parse(savedLeads);
      }
    } catch {
      // Ignore localStorage in SSR/Next build environments
    }
  }

  const saveLeads = (leads: Lead[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('crm_leads', JSON.stringify(leads));
      } catch {
        // Ignore
      }
    }
  };

  return {
    leads: initialLeads,

    addLead: (leadData) => {
      const newLead: Lead = {
        ...leadData,
        id: `lead-${Date.now()}`,
        createdAt: new Date().toISOString(),
        qaList: [],
        notes: [],
        callLogs: [],
        timeline: [
          {
            id: `t-${Date.now()}`,
            type: 'creation',
            title: 'Lead Added Manually',
            description: `Lead created by system administrator.`,
            createdAt: new Date().toISOString()
          }
        ]
      };

      set((state) => {
        const updated = [newLead, ...state.leads];
        saveLeads(updated);
        return { leads: updated };
      });
    },

    updateLeadStatus: (leadId, status) => {
      set((state) => {
        const updated = state.leads.map((lead) => {
          if (lead.id !== leadId) return lead;

          const oldStatus = lead.status;
          if (oldStatus === status) return lead;

          const statusChangeTimeline: TimelineEvent = {
            id: `t-${Date.now()}`,
            type: 'status_change',
            title: 'Status Updated',
            description: `Status updated from ${oldStatus} to ${status}.`,
            createdAt: new Date().toISOString()
          };

          return {
            ...lead,
            status,
            timeline: [statusChangeTimeline, ...lead.timeline]
          };
        });

        saveLeads(updated);
        return { leads: updated };
      });
    },

    updateLeadOwner: (leadId, userId) => {
      set((state) => {
        const updated = state.leads.map((lead) => {
          if (lead.id !== leadId) return lead;

          const assignmentTimeline: TimelineEvent = {
            id: `t-${Date.now()}`,
            type: 'assignment',
            title: 'Owner Reassigned',
            description: `Lead reassigned to user ID: ${userId}.`,
            createdAt: new Date().toISOString()
          };

          return {
            ...lead,
            assignedUserId: userId,
            timeline: [assignmentTimeline, ...lead.timeline]
          };
        });

        saveLeads(updated);
        return { leads: updated };
      });
    },

    addNoteToLead: (leadId, noteContent, author) => {
      set((state) => {
        const updated = state.leads.map((lead) => {
          if (lead.id !== leadId) return lead;

          const newNote: LeadNote = {
            id: `n-${Date.now()}`,
            content: noteContent,
            author,
            createdAt: new Date().toISOString()
          };

          const noteTimeline: TimelineEvent = {
            id: `t-${Date.now()}`,
            type: 'note',
            title: 'Note Added',
            description: `Note added by ${author}: "${noteContent.substring(0, 50)}${noteContent.length > 50 ? '...' : ''}"`,
            author,
            createdAt: new Date().toISOString()
          };

          return {
            ...lead,
            notes: [newNote, ...lead.notes],
            timeline: [noteTimeline, ...lead.timeline]
          };
        });

        saveLeads(updated);
        return { leads: updated };
      });
    },

    logCallForLead: (leadId, duration, description, author) => {
      set((state) => {
        const updated = state.leads.map((lead) => {
          if (lead.id !== leadId) return lead;

          const newCall: CallLog = {
            id: `c-${Date.now()}`,
            duration,
            description,
            author,
            createdAt: new Date().toISOString()
          };

          const callTimeline: TimelineEvent = {
            id: `t-${Date.now()}`,
            type: 'call',
            title: 'Call Logged',
            description: `Call logged by ${author} (Duration: ${duration}).`,
            author,
            createdAt: new Date().toISOString()
          };

          return {
            ...lead,
            callLogs: [newCall, ...lead.callLogs],
            timeline: [callTimeline, ...lead.timeline]
          };
        });

        saveLeads(updated);
        return { leads: updated };
      });
    },

    deleteLead: (leadId) => {
      set((state) => {
        const updated = state.leads.filter((lead) => lead.id !== leadId);
        saveLeads(updated);
        return { leads: updated };
      });
    },

    getLeadById: (leadId) => {
      return get().leads.find((lead) => lead.id === leadId);
    }
  };
});
