export interface LeadNote {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface CallLog {
  id: string;
  duration: string; // e.g. "2m 15s"
  description: string;
  author: string;
  createdAt: string;
}

export interface QualificationQA {
  question: string;
  answer: string;
  timestamp: string;
}

export interface TimelineEvent {
  id: string;
  type: 'creation' | 'system' | 'message' | 'status_change' | 'call' | 'note' | 'assignment';
  title: string;
  description: string;
  author?: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  source: 'Meta Ads' | 'Google Ads' | 'Website Forms' | 'CSV Upload';
  score: number; // 0-100
  status: 'New' | 'Contacted' | 'Qualified' | 'Follow-Up' | 'Won' | 'Lost';
  assignedUserId: string;
  createdAt: string;
  budget?: string;
  requirements?: string;
  qaList: QualificationQA[];
  notes: LeadNote[];
  callLogs: CallLog[];
  timeline: TimelineEvent[];
}

export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'David Miller',
    phone: '+1 (555) 234-5678',
    email: 'david.miller@example.com',
    company: 'Miller & Co LLC',
    source: 'Meta Ads',
    score: 85,
    status: 'Qualified',
    assignedUserId: 'u2',
    createdAt: '2026-07-15T09:30:00Z',
    budget: '$50,000 - $100,000',
    requirements: 'Interested in buying commercial real estate in downtown Chicago. Looking for immediate options.',
    qaList: [
      { question: 'What is your primary goal?', answer: 'Invest in commercial office space.', timestamp: '2026-07-15T09:32:00Z' },
      { question: 'What is your budget?', answer: '$80,000 downpayment, pre-approved for $450k.', timestamp: '2026-07-15T09:32:30Z' },
      { question: 'What is your timeframe for purchase?', answer: 'Within the next 30 days.', timestamp: '2026-07-15T09:33:00Z' },
      { question: 'Are you pre-approved for financing?', answer: 'Yes, with Chase Bank.', timestamp: '2026-07-15T09:33:15Z' },
    ],
    notes: [
      { id: 'n1', content: 'Met with loan officer. Verification complete. David is highly motivated.', author: 'Sarah Connor', createdAt: '2026-07-16T14:20:00Z' }
    ],
    callLogs: [
      { id: 'c1', duration: '5m 45s', description: 'Discussed prime listings on 5th Ave. He requested floor plans.', author: 'Sarah Connor', createdAt: '2026-07-16T11:15:00Z' }
    ],
    timeline: [
      { id: 't1', type: 'creation', title: 'Lead Generated', description: 'Created via Meta Ads Campaign "Chicago Office Spaces"', createdAt: '2026-07-15T09:30:00Z' },
      { id: 't2', type: 'system', title: 'AI Conversation Initiated', description: 'Auto-welcome flow triggered via WhatsApp API.', createdAt: '2026-07-15T09:31:00Z' },
      { id: 't3', type: 'message', title: 'AI Qualification Completed', description: 'Lead successfully answered all 4 triage questions. Qualified score calculated: 85 (HOT).', createdAt: '2026-07-15T09:33:15Z' },
      { id: 't4', type: 'status_change', title: 'Status Updated', description: 'Moved from New to Qualified by AI Engine.', createdAt: '2026-07-15T09:33:18Z' },
      { id: 't5', type: 'assignment', title: 'Owner Assigned', description: 'Assigned to Sarah Connor for immediate high-touch follow-up.', createdAt: '2026-07-15T09:35:00Z' },
      { id: 't6', type: 'call', title: 'Call Logged', description: 'Sarah Connor logged a 5m 45s call: Discussed prime listings on 5th Ave.', createdAt: '2026-07-16T11:15:00Z' },
      { id: 't7', type: 'note', title: 'Note Added', description: 'Sarah Connor added a note regarding loan officer verification.', createdAt: '2026-07-16T14:20:00Z' },
    ]
  },
  {
    id: 'lead-2',
    name: 'Emily Watson',
    phone: '+1 (555) 876-5432',
    email: 'emily.w@techgrowth.io',
    company: 'TechGrowth Solutions',
    source: 'Website Forms',
    score: 92,
    status: 'New',
    assignedUserId: 'u1',
    createdAt: '2026-07-19T08:15:00Z',
    budget: '$100,000+',
    requirements: 'Requires custom software integrations and WhatsApp enterprise engagement tools.',
    qaList: [
      { question: 'What size is your business?', answer: '50-200 employees.', timestamp: '2026-07-19T08:16:00Z' },
      { question: 'What is your current WhatsApp setup?', answer: 'Using standard WhatsApp Business App, but need multi-agent chat and CRM syncing.', timestamp: '2026-07-19T08:16:40Z' },
      { question: 'What is your timeline?', answer: 'ASAP, current solution is failing.', timestamp: '2026-07-19T08:17:10Z' },
    ],
    notes: [],
    callLogs: [],
    timeline: [
      { id: 't2-1', type: 'creation', title: 'Lead Generated', description: 'Created via Contact Form on website', createdAt: '2026-07-19T08:15:00Z' },
      { id: 't2-2', type: 'system', title: 'AI Qualification Started', description: 'Triage script sent successfully.', createdAt: '2026-07-19T08:15:30Z' },
      { id: 't2-3', type: 'message', title: 'Answers Parsed', description: 'Identified as hot enterprise buyer (Score: 92).', createdAt: '2026-07-19T08:17:10Z' }
    ]
  },
  {
    id: 'lead-3',
    name: 'Robert Downey',
    phone: '+1 (555) 345-6789',
    email: 'robert@starkcorp.com',
    company: 'StarkCorp Enterprises',
    source: 'Google Ads',
    score: 45,
    status: 'Contacted',
    assignedUserId: 'u3',
    createdAt: '2026-07-17T11:00:00Z',
    budget: '$10,000 - $25,000',
    requirements: 'Inquiring about automated marketing lead nurture campaigns.',
    qaList: [
      { question: 'What is your primary goal?', answer: 'Automate marketing reports.', timestamp: '2026-07-17T11:02:00Z' },
      { question: 'What is your timeline?', answer: 'Evaluating options for next quarter.', timestamp: '2026-07-17T11:03:00Z' },
    ],
    notes: [
      { id: 'n2', content: 'Sent brochure. He is still comparing with other platforms.', author: 'John Doe', createdAt: '2026-07-18T10:00:00Z' }
    ],
    callLogs: [
      { id: 'c2', duration: '3m 12s', description: 'Initial intro call. Kept it brief.', author: 'John Doe', createdAt: '2026-07-17T15:30:00Z' }
    ],
    timeline: [
      { id: 't3-1', type: 'creation', title: 'Lead Generated', description: 'Created via Google Search Campaign "Best CRM SaaS"', createdAt: '2026-07-17T11:00:00Z' },
      { id: 't3-2', type: 'call', title: 'Outbound Call', description: 'Logged by John Doe (3m 12s)', createdAt: '2026-07-17T15:30:00Z' },
      { id: 't3-3', type: 'status_change', title: 'Status Changed', description: 'Moved to Contacted by John Doe', createdAt: '2026-07-17T15:30:15Z' },
      { id: 't3-4', type: 'note', title: 'Note Added', description: 'John Doe: Sent marketing brochure.', createdAt: '2026-07-18T10:00:00Z' }
    ]
  },
  {
    id: 'lead-4',
    name: 'Jessica Chastain',
    phone: '+1 (555) 456-7890',
    email: 'jessica@alphafilms.co',
    company: 'Alpha Films Ltd',
    source: 'CSV Upload',
    score: 78,
    status: 'Follow-Up',
    assignedUserId: 'u2',
    createdAt: '2026-07-14T08:00:00Z',
    budget: '$30,000',
    requirements: 'Wants to setup client reminder messages via WhatsApp for movie castings.',
    qaList: [
      { question: 'What is your primary goal?', answer: 'Send notifications to cast members.', timestamp: '2026-07-14T10:00:00Z' }
    ],
    notes: [
      { id: 'n3', content: 'Follow up set for next Monday to show cast notification demo.', author: 'Sarah Connor', createdAt: '2026-07-15T16:00:00Z' }
    ],
    callLogs: [
      { id: 'c3', duration: '12m 40s', description: 'Detailed demo of the custom template workspace and schedule scheduler.', author: 'Sarah Connor', createdAt: '2026-07-15T15:30:00Z' }
    ],
    timeline: [
      { id: 't4-1', type: 'creation', title: 'Imported via CSV', description: 'Imported by Admin Sutharsan in batch "July Leads"', createdAt: '2026-07-14T08:00:00Z' },
      { id: 't4-2', type: 'call', title: 'Demo Call Logged', description: 'Sarah Connor logged a 12m 40s call: Detailed workspace walkthrough.', createdAt: '2026-07-15T15:30:00Z' },
      { id: 't4-3', type: 'status_change', title: 'Status Changed', description: 'Moved to Follow-Up by Sarah Connor.', createdAt: '2026-07-15T15:31:00Z' }
    ]
  },
  {
    id: 'lead-5',
    name: 'Bruce Wayne',
    phone: '+1 (555) 999-1111',
    email: 'bruce@waynecorp.org',
    company: 'Wayne Enterprises',
    source: 'Meta Ads',
    score: 99,
    status: 'Won',
    assignedUserId: 'u1',
    createdAt: '2026-07-10T12:00:00Z',
    budget: '$500,000',
    requirements: 'Enterprise-grade encrypted multi-channel communication stack across Gotham City security branches.',
    qaList: [
      { question: 'Primary goal?', answer: 'Encrypted communication network.', timestamp: '2026-07-10T12:02:00Z' },
      { question: 'Budget?', answer: 'Unlimited.', timestamp: '2026-07-10T12:02:30Z' }
    ],
    notes: [
      { id: 'n4', content: 'Enterprise contract signed. Implementation starts next week.', author: 'Sutharsan', createdAt: '2026-07-12T10:00:00Z' }
    ],
    callLogs: [
      { id: 'c4', duration: '45m 00s', description: 'Executive proposal presentation with VP of Tech.', author: 'Sutharsan', createdAt: '2026-07-11T14:00:00Z' }
    ],
    timeline: [
      { id: 't5-1', type: 'creation', title: 'Lead Generated', description: 'Created via Meta Ads Gotham Campaign', createdAt: '2026-07-10T12:00:00Z' },
      { id: 't5-2', type: 'call', title: 'Proposal Call', description: 'Sutharsan logged a 45m call', createdAt: '2026-07-11T14:00:00Z' },
      { id: 't5-3', type: 'status_change', title: 'Deal Won', description: 'Contract signed. Moved status to Won.', createdAt: '2026-07-12T10:00:00Z' }
    ]
  },
  {
    id: 'lead-6',
    name: 'Selina Kyle',
    phone: '+1 (555) 777-2222',
    email: 'selina@catburglar.net',
    company: 'Kyle Designs',
    source: 'Google Ads',
    score: 30,
    status: 'Lost',
    assignedUserId: 'u3',
    createdAt: '2026-07-08T15:00:00Z',
    budget: 'Under $2,000',
    requirements: 'Small design store needing simple auto-replies.',
    qaList: [
      { question: 'Goal?', answer: 'Auto reply when away.', timestamp: '2026-07-08T15:02:00Z' }
    ],
    notes: [
      { id: 'n5', content: 'Budget is too low. Rejected standard pricing. Wants free tier.', author: 'John Doe', createdAt: '2026-07-09T10:00:00Z' }
    ],
    callLogs: [],
    timeline: [
      { id: 't6-1', type: 'creation', title: 'Lead Generated', description: 'Google Search Ads', createdAt: '2026-07-08T15:00:00Z' },
      { id: 't6-2', type: 'status_change', title: 'Marked Lost', description: 'Moved to Lost due to poor budget fit.', createdAt: '2026-07-09T10:05:00Z' }
    ]
  },
  {
    id: 'lead-7',
    name: 'Tony Stark',
    phone: '+1 (555) 3000-4444',
    email: 'tony@avengers.org',
    company: 'Stark Industries',
    source: 'Website Forms',
    score: 95,
    status: 'Qualified',
    assignedUserId: 'u2',
    createdAt: '2026-07-18T16:00:00Z',
    budget: '$250,000',
    requirements: 'Integrate custom AI jarvis-like responses in WhatsApp chats.',
    qaList: [
      { question: 'What is your budget?', answer: '$250,000.', timestamp: '2026-07-18T16:01:00Z' },
      { question: 'What is the goal?', answer: 'Offload initial customer queries to advanced model.', timestamp: '2026-07-18T16:01:30Z' }
    ],
    notes: [],
    callLogs: [],
    timeline: [
      { id: 't7-1', type: 'creation', title: 'Lead Generated', description: 'Website Contact Page', createdAt: '2026-07-18T16:00:00Z' },
      { id: 't7-2', type: 'message', title: 'AI Qualified', description: 'Scored 95 (HOT). High budget and ready for setup.', createdAt: '2026-07-18T16:02:00Z' }
    ]
  },
  {
    id: 'lead-8',
    name: 'Natasha Romanoff',
    phone: '+1 (555) 444-5555',
    email: 'natasha@shield.gov',
    company: 'SHIELD Operations',
    source: 'Meta Ads',
    score: 68,
    status: 'Contacted',
    assignedUserId: 'u2',
    createdAt: '2026-07-18T10:00:00Z',
    budget: '$15,000',
    requirements: 'Secure messaging service for undercover agents.',
    qaList: [
      { question: 'Goal?', answer: 'Covert notifications.', timestamp: '2026-07-18T10:05:00Z' }
    ],
    notes: [],
    callLogs: [],
    timeline: [
      { id: 't8-1', type: 'creation', title: 'Lead Generated', description: 'Meta Ads Campaign "Secure Comms"', createdAt: '2026-07-18T10:00:00Z' }
    ]
  }
];
export type LeadStatus = Lead['status'];
