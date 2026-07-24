export interface Message {
  id: string;
  sender: 'lead' | 'system' | 'agent' | 'ai';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read' | 'failed';
}

export interface ChatThread {
  leadId: string;
  leadName: string;
  phone: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  aiMode: boolean; // Is AI auto-reply active?
  messages: Message[];
}

export interface BroadcastCampaign {
  id: string;
  name: string;
  templateName: string;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  status: 'Draft' | 'Scheduled' | 'Sending' | 'Completed';
  createdAt: string;
  scheduledFor?: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: 'Qualification' | 'Follow-up' | 'Marketing' | 'Support' | 'Utility' | 'Authentication';
  body: string;
}

export const mockTemplates: MessageTemplate[] = [
  {
    id: 't-qualify-1',
    name: 'Real Estate Pre-Screening',
    category: 'Qualification',
    body: 'Hi {{name}}, thanks for your interest in our listings. Are you looking to buy within the next 30 days, 60 days, or just browsing? Also, what is your comfortable budget range?'
  },
  {
    id: 't-qualify-2',
    name: 'SaaS Demo Booking',
    category: 'Qualification',
    body: 'Hello {{name}}! Welcome to WhatsappCRM. To better prepare our demo, how many agents will be using the tool, and what is your current CRM solution?'
  },
  {
    id: 't-follow-1',
    name: 'Day 3 Nudge',
    category: 'Follow-up',
    body: 'Hi {{name}}, just checking in to see if you had any questions regarding the commercial real estate floor plans we discussed. Let me know if you would like to hop on a quick call!'
  },
  {
    id: 't-marketing-1',
    name: 'New Feature Broadcast',
    category: 'Marketing',
    body: 'Exciting news {{name}}! We just launched our AI Auto-Qualification Engine v2. Users are reporting a 40% reduction in lead response times. Click here to learn more: https://GreenPilot.io/ai'
  }
];

export const mockCampaigns: BroadcastCampaign[] = [
  {
    id: 'c-1',
    name: 'July Real Estate Newsletter',
    templateName: 'New Feature Broadcast',
    sentCount: 1500,
    deliveredCount: 1485,
    readCount: 1120,
    status: 'Completed',
    createdAt: '2026-07-10T09:00:00Z'
  },
  {
    id: 'c-2',
    name: 'Demo Re-engagement Pitch',
    templateName: 'Day 3 Nudge',
    sentCount: 350,
    deliveredCount: 340,
    readCount: 210,
    status: 'Completed',
    createdAt: '2026-07-14T11:00:00Z'
  },
  {
    id: 'c-3',
    name: 'Product Launch Announcement',
    templateName: 'New Feature Broadcast',
    sentCount: 0,
    deliveredCount: 0,
    readCount: 0,
    status: 'Scheduled',
    createdAt: '2026-07-19T06:00:00Z',
    scheduledFor: '2026-07-22T10:00:00Z'
  }
];

export const mockChats: ChatThread[] = [
  {
    leadId: 'lead-1',
    leadName: 'David Miller',
    phone: '+1 (555) 234-5678',
    lastMessage: 'Great, Sarah Connor added a note regarding loan officer verification.',
    timestamp: '2026-07-16T14:20:00Z',
    unreadCount: 0,
    aiMode: false,
    messages: [
      { id: 'm1-1', sender: 'system', text: 'Lead imported via Meta Ads.', timestamp: '2026-07-15T09:30:00Z' },
      { id: 'm1-2', sender: 'ai', text: 'Hi David! Thank you for inquiring about our Chicago Office Spaces. To help us find the perfect match, what is your primary goal, and what is your budget range?', timestamp: '2026-07-15T09:31:00Z', status: 'read' },
      { id: 'm1-3', sender: 'lead', text: 'Hey there. I am looking to invest in commercial office space in downtown. My budget range is $50,000 - $100,000 downpayment, pre-approved for $450k.', timestamp: '2026-07-15T09:32:00Z' },
      { id: 'm1-4', sender: 'ai', text: 'Excellent! And are you looking to purchase within the next 30 days, or are you just planning ahead?', timestamp: '2026-07-15T09:32:30Z', status: 'read' },
      { id: 'm1-5', sender: 'lead', text: 'Within the next 30 days. Looking to close quickly.', timestamp: '2026-07-15T09:33:00Z' },
      { id: 'm1-6', sender: 'ai', text: 'Perfect. We have assigned a senior representative, Sarah Connor, to share listings and floor plans with you. She will call you shortly!', timestamp: '2026-07-15T09:33:15Z', status: 'read' },
      { id: 'm1-7', sender: 'agent', text: 'Hi David, Sarah here. I just sent you three PDF layouts to your email david.miller@example.com. Let me know when is a good time to visit.', timestamp: '2026-07-16T10:00:00Z', status: 'read' },
      { id: 'm1-8', sender: 'lead', text: 'Got them. Can we look at the 5th Ave layouts? They look promising.', timestamp: '2026-07-16T10:30:00Z' }
    ]
  },
  {
    leadId: 'lead-2',
    leadName: 'Emily Watson',
    phone: '+1 (555) 876-5432',
    lastMessage: 'ASAP, current solution is failing.',
    timestamp: '2026-07-19T08:17:10Z',
    unreadCount: 1,
    aiMode: true,
    messages: [
      { id: 'm2-1', sender: 'ai', text: 'Hello Emily! Thank you for reaching out via our Website Contact form. What size is your business, and what is your timeline for CRM integration?', timestamp: '2026-07-19T08:15:30Z', status: 'delivered' },
      { id: 'm2-2', sender: 'lead', text: 'We have around 80 employees. Need a WhatsApp multi-agent dashboard ASAP, our current provider keeps dropping chats.', timestamp: '2026-07-19T08:16:40Z' },
      { id: 'm2-3', sender: 'ai', text: 'Got it. High response reliability is critical. What budget or tier are you targeting?', timestamp: '2026-07-19T08:16:50Z', status: 'delivered' },
      { id: 'm2-4', sender: 'lead', text: 'Budget is around $10,000 to $15,000/yr. We need to transition this week.', timestamp: '2026-07-19T08:17:10Z' }
    ]
  },
  {
    leadId: 'lead-3',
    leadName: 'Robert Downey',
    phone: '+1 (555) 345-6789',
    lastMessage: 'Thanks, I will review the brochure and let you know.',
    timestamp: '2026-07-18T10:30:00Z',
    unreadCount: 0,
    aiMode: false,
    messages: [
      { id: 'm3-1', sender: 'ai', text: 'Hello Robert! What is your primary marketing goal with our WhatsApp campaign builder?', timestamp: '2026-07-17T11:01:00Z', status: 'read' },
      { id: 'm3-2', sender: 'lead', text: 'We want to nurture leads and automatically send reports.', timestamp: '2026-07-17T11:02:00Z' },
      { id: 'm3-3', sender: 'agent', text: 'Hi Robert, I just logged a brief intro call. I am emailing over our automated reporting guide now.', timestamp: '2026-07-17T15:35:00Z', status: 'read' },
      { id: 'm3-4', sender: 'lead', text: 'Thanks, I will review the brochure and let you know.', timestamp: '2026-07-18T10:30:00Z' }
    ]
  },
  {
    leadId: 'lead-4',
    leadName: 'Jessica Chastain',
    phone: '+1 (555) 456-7890',
    lastMessage: 'Sure, talk on Monday.',
    timestamp: '2026-07-15T16:05:00Z',
    unreadCount: 0,
    aiMode: false,
    messages: [
      { id: 'm4-1', sender: 'agent', text: 'Hi Jessica, I have set up our casting template test. We will hop on a screen share next Monday.', timestamp: '2026-07-15T16:00:00Z', status: 'read' },
      { id: 'm4-2', sender: 'lead', text: 'Sure, talk on Monday.', timestamp: '2026-07-15T16:05:00Z' }
    ]
  }
];
