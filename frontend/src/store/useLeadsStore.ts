import { create } from 'zustand';
import { Lead, LeadStatus, LeadNote, CallLog, TimelineEvent } from '../mock/mockLeads';
import { apiFetch } from '@/lib/api';

interface LeadsState {
  leads: Lead[];
  isLoading: boolean;
  fetchLeads: () => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'callLogs' | 'timeline' | 'qaList'>) => Promise<void>;
  updateLeadStatus: (leadId: string, status: LeadStatus) => Promise<void>;
  updateLeadOwner: (leadId: string, userId: string) => Promise<void>;
  addNoteToLead: (leadId: string, noteContent: string, author: string) => Promise<void>;
  logCallForLead: (leadId: string, duration: string, description: string, author: string) => Promise<void>;
  deleteLead: (leadId: string) => Promise<void>;
  getLeadById: (leadId: string) => Lead | undefined;
}

function mapBackendLeadToFrontend(bLead: any): Lead {
  return {
    id: bLead.id,
    name: bLead.name,
    phone: bLead.phone || '',
    email: bLead.email || '',
    company: bLead.company || '',
    source: bLead.leadSource || 'Meta Ads',
    status: (bLead.currentStatus || 'New') as LeadStatus,
    score: bLead.leadScore || 0,
    priority: (bLead.priority || 'Medium') as 'High' | 'Medium' | 'Low',
    createdAt: bLead.createdAt,
    assignedUserId: bLead.assignments?.[0]?.userId || '',
    notes: (bLead.notes || []).map((n: any) => ({
      id: n.id,
      content: n.content,
      author: 'Owner',
      createdAt: n.createdAt
    })),
    callLogs: (bLead.callLogs || []).map((c: any) => ({
      id: c.id,
      duration: c.duration ? `${c.duration}s` : '0s',
      description: c.remarks || c.outcome || '',
      author: 'Owner',
      createdAt: c.createdAt
    })),
    timeline: (bLead.timelines || []).map((t: any) => ({
      id: t.id,
      type: 'status_change',
      title: t.action,
      description: t.description || '',
      createdAt: t.createdAt
    })),
    qaList: (bLead.qualifications || []).map((q: any) => ({
      question: q.question,
      answer: q.answer
    }))
  };
}

export const useLeadsStore = create<LeadsState>((set, get) => {
  return {
    leads: [],
    isLoading: false,

    fetchLeads: async () => {
      set({ isLoading: true });
      try {
        const response = await apiFetch('/leads?limit=100');
        const backendLeads = response.data.data || [];
        const leads = backendLeads.map(mapBackendLeadToFrontend);
        set({ leads, isLoading: false });
      } catch (error) {
        console.error('Fetch leads API error:', error);
        set({ isLoading: false });
      }
    },

    addLead: async (leadData) => {
      try {
        const response = await apiFetch('/leads', {
          method: 'POST',
          body: JSON.stringify({
            name: leadData.name,
            phone: leadData.phone || undefined,
            email: leadData.email || undefined,
            company: leadData.company || undefined,
            leadSource: leadData.source,
            priority: leadData.priority || 'Medium'
          }),
        });

        if (response.success) {
          // Re-fetch all leads to get full joined structures
          const getLeads = get().fetchLeads;
          await getLeads();
        }
      } catch (error) {
        console.error('Create lead API error:', error);
      }
    },

    updateLeadStatus: async (leadId, status) => {
      try {
        const response = await apiFetch(`/leads/${leadId}`, {
          method: 'PUT',
          body: JSON.stringify({
            currentStatus: status
          }),
        });

        if (response.success) {
          const getLeads = get().fetchLeads;
          await getLeads();
        }
      } catch (error) {
        console.error('Update lead status API error:', error);
      }
    },

    updateLeadOwner: async (leadId, userId) => {
      try {
        const response = await apiFetch(`/leads/${leadId}/assign`, {
          method: 'POST',
          body: JSON.stringify({
            userId
          }),
        });

        if (response.success) {
          const getLeads = get().fetchLeads;
          await getLeads();
        }
      } catch (error) {
        console.error('Assign lead owner API error:', error);
      }
    },

    addNoteToLead: async (leadId, noteContent, author) => {
      try {
        const response = await apiFetch('/crm/notes', {
          method: 'POST',
          body: JSON.stringify({
            leadId,
            content: noteContent
          }),
        });

        if (response.success) {
          const getLeads = get().fetchLeads;
          await getLeads();
        }
      } catch (error) {
        console.error('Add note API error:', error);
      }
    },

    logCallForLead: async (leadId, duration, description, author) => {
      try {
        // Parse duration like "2m 30s" to seconds
        const parsedDuration = parseInt(duration) || 60;
        const response = await apiFetch('/crm/calls', {
          method: 'POST',
          body: JSON.stringify({
            leadId,
            callDate: new Date().toISOString(),
            duration: parsedDuration,
            outcome: 'Completed',
            remarks: description
          }),
        });

        if (response.success) {
          const getLeads = get().fetchLeads;
          await getLeads();
        }
      } catch (error) {
        console.error('Log call API error:', error);
      }
    },

    deleteLead: async (leadId) => {
      try {
        // Simulate soft delete locally on error or call delete if implemented
        set((state) => ({
          leads: state.leads.filter((l) => l.id !== leadId)
        }));
      } catch (error) {
        console.error('Delete lead error:', error);
      }
    },

    getLeadById: (leadId) => {
      return get().leads.find((lead) => lead.id === leadId);
    }
  };
});
