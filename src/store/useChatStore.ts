import { create } from 'zustand';
import { ChatThread, Message, mockChats, BroadcastCampaign, mockCampaigns, MessageTemplate, mockTemplates } from '../mock/mockMessages';

interface ChatState {
  chats: ChatThread[];
  campaigns: BroadcastCampaign[];
  templates: MessageTemplate[];
  activeChatId: string | null;
  setActiveChatId: (leadId: string | null) => void;
  sendMessage: (leadId: string, text: string, sender: 'agent' | 'ai') => void;
  toggleAiMode: (leadId: string) => void;
  launchCampaign: (name: string, templateId: string) => Promise<void>;
  receiveMessageSimulator: (leadId: string, text: string) => void;
  addTemplate: (template: Omit<MessageTemplate, 'id'>) => void;
}

export const useChatStore = create<ChatState>((set, get) => {
  let initialChats = mockChats;
  let initialCampaigns = mockCampaigns;
  let initialTemplates = mockTemplates;

  if (typeof window !== 'undefined') {
    try {
      const savedChats = localStorage.getItem('crm_chats');
      const savedCampaigns = localStorage.getItem('crm_campaigns');
      const savedTemplates = localStorage.getItem('crm_templates');
      
      if (savedChats) initialChats = JSON.parse(savedChats);
      if (savedCampaigns) initialCampaigns = JSON.parse(savedCampaigns);
      if (savedTemplates) initialTemplates = JSON.parse(savedTemplates);
    } catch {
      // Ignore
    }
  }

  const saveToStorage = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch {
        // Ignore
      }
    }
  };

  return {
    chats: initialChats,
    campaigns: initialCampaigns,
    templates: initialTemplates,
    activeChatId: initialChats[0]?.leadId || null,

    setActiveChatId: (leadId) => {
      set({ activeChatId: leadId });
      // Mark as read when opening
      if (leadId) {
        set((state) => {
          const updated = state.chats.map((chat) => {
            if (chat.leadId !== leadId) return chat;
            return { ...chat, unreadCount: 0 };
          });
          saveToStorage('crm_chats', updated);
          return { chats: updated };
        });
      }
    },

    sendMessage: (leadId, text, sender) => {
      const newMessage: Message = {
        id: `m-${Date.now()}`,
        sender,
        text,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      set((state) => {
        const updated = state.chats.map((chat) => {
          if (chat.leadId !== leadId) return chat;
          
          const updatedMessages = [...chat.messages, newMessage];
          return {
            ...chat,
            lastMessage: text,
            timestamp: new Date().toISOString(),
            messages: updatedMessages
          };
        });

        saveToStorage('crm_chats', updated);
        return { chats: updated };
      });

      // Simulate status updates (sent -> delivered -> read)
      setTimeout(() => {
        set((state) => {
          const updated = state.chats.map((chat) => {
            if (chat.leadId !== leadId) return chat;
            const updatedMessages = chat.messages.map((m) => {
              if (m.id === newMessage.id) return { ...m, status: 'delivered' as const };
              return m;
            });
            return { ...chat, messages: updatedMessages };
          });
          saveToStorage('crm_chats', updated);
          return { chats: updated };
        });
      }, 800);

      setTimeout(() => {
        set((state) => {
          const updated = state.chats.map((chat) => {
            if (chat.leadId !== leadId) return chat;
            const updatedMessages = chat.messages.map((m) => {
              if (m.id === newMessage.id) return { ...m, status: 'read' as const };
              return m;
            });
            return { ...chat, messages: updatedMessages };
          });
          saveToStorage('crm_chats', updated);
          return { chats: updated };
        });
      }, 1500);

      // Trigger automatic simulation of client response if AI mode is active OR if agent spoke to it.
      const chat = get().chats.find((c) => c.leadId === leadId);
      if (chat && sender === 'agent') {
        const isAiOn = chat.aiMode;
        
        setTimeout(() => {
          const replyText = isAiOn 
            ? "🤖 [AI Copilot]: I will analyze your inquiry and provide matching details soon."
            : "Thanks for the message! I will review this and get back to you shortly.";
            
          get().receiveMessageSimulator(leadId, replyText);
        }, 2500);
      }
    },

    receiveMessageSimulator: (leadId, text) => {
      const newMessage: Message = {
        id: `m-${Date.now()}`,
        sender: text.includes('🤖') ? 'ai' : 'lead',
        text,
        timestamp: new Date().toISOString()
      };

      set((state) => {
        const updated = state.chats.map((chat) => {
          if (chat.leadId !== leadId) return chat;

          const isActive = state.activeChatId === leadId;
          const updatedMessages = [...chat.messages, newMessage];

          return {
            ...chat,
            lastMessage: text,
            timestamp: new Date().toISOString(),
            unreadCount: isActive ? 0 : chat.unreadCount + 1,
            messages: updatedMessages
          };
        });

        saveToStorage('crm_chats', updated);
        return { chats: updated };
      });
    },

    toggleAiMode: (leadId) => {
      set((state) => {
        const updated = state.chats.map((chat) => {
          if (chat.leadId !== leadId) return chat;
          return { ...chat, aiMode: !chat.aiMode };
        });
        saveToStorage('crm_chats', updated);
        return { chats: updated };
      });
    },

    launchCampaign: async (name, templateId) => {
      // Mock API latency
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const template = get().templates.find((t) => t.id === templateId);
      const templateName = template ? template.name : 'Unknown Template';

      const newCampaign: BroadcastCampaign = {
        id: `c-${Date.now()}`,
        name,
        templateName,
        sentCount: 250,
        deliveredCount: 242,
        readCount: 185,
        status: 'Completed',
        createdAt: new Date().toISOString()
      };

      set((state) => {
        const updated = [newCampaign, ...state.campaigns];
        saveToStorage('crm_campaigns', updated);
        return { campaigns: updated };
      });
    },

    addTemplate: (templateData) => {
      const newTemplate: MessageTemplate = {
        ...templateData,
        id: `t-${Date.now()}`
      };

      set((state) => {
        const updated = [...state.templates, newTemplate];
        saveToStorage('crm_templates', updated);
        return { templates: updated };
      });
    }
  };
});
