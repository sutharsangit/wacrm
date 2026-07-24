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

export const mockLeads: Lead[] = [];
export type LeadStatus = Lead['status'];
