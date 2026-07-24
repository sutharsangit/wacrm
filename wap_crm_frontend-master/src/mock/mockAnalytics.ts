export interface LeadSourceData {
  source: string;
  count: number;
  color: string;
}

export interface MonthlyTrendData {
  month: string;
  leads: number;
  qualified: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
}

export interface TeamPerformance {
  agentName: string;
  leadsAssigned: number;
  qualifiedCount: number;
  conversionRate: number; // e.g. 75 (%)
  avgResponseTime: string; // e.g. "4m"
}

export interface RevenueData {
  month: string;
  amount: number;
  projected: number;
}

export const mockLeadSources: LeadSourceData[] = [
  { source: 'Meta Ads', count: 345, color: '#10b981' }, // primary green
  { source: 'Google Ads', count: 210, color: '#3b82f6' }, // blue
  { source: 'Website Forms', count: 180, color: '#f59e0b' }, // amber
  { source: 'CSV Upload', count: 95, color: '#6b7280' } // gray
];

export const mockMonthlyTrends: MonthlyTrendData[] = [
  { month: 'Jan', leads: 320, qualified: 180 },
  { month: 'Feb', leads: 400, qualified: 210 },
  { month: 'Mar', leads: 480, qualified: 290 },
  { month: 'Apr', leads: 510, qualified: 310 },
  { month: 'May', leads: 600, qualified: 420 },
  { month: 'Jun', leads: 750, qualified: 530 },
  { month: 'Jul', leads: 830, qualified: 610 }
];

export const mockFunnelStages: FunnelStage[] = [
  { stage: 'Total Leads', count: 830, percentage: 100 },
  { stage: 'AI Engaged', count: 680, percentage: 81.9 },
  { stage: 'Qualified', count: 420, percentage: 50.6 },
  { stage: 'Proposal Sent', count: 210, percentage: 25.3 },
  { stage: 'Closed Won', count: 115, percentage: 13.8 }
];

export const mockRevenueTrends: RevenueData[] = [
  { month: 'Feb', amount: 8500, projected: 9000 },
  { month: 'Mar', amount: 11000, projected: 12000 },
  { month: 'Apr', amount: 15400, projected: 15000 },
  { month: 'May', amount: 19800, projected: 18000 },
  { month: 'Jun', amount: 24500, projected: 22000 },
  { month: 'Jul', amount: 31200, projected: 28000 }
];

export const mockTeamPerformance: TeamPerformance[] = [
  { agentName: 'Sarah Connor', leadsAssigned: 124, qualifiedCount: 96, conversionRate: 77.4, avgResponseTime: '3m 15s' },
  { agentName: 'John Doe', leadsAssigned: 98, qualifiedCount: 52, conversionRate: 53.0, avgResponseTime: '8m 40s' },
  { agentName: 'Alice Johnson', leadsAssigned: 84, qualifiedCount: 65, conversionRate: 77.3, avgResponseTime: '4m 02s' }
];

export const mockUsageMetrics = {
  activePlan: 'Professional',
  monthlyLeadsLimit: 2500,
  monthlyLeadsUsed: 830,
  whatsAppMessagesLimit: 10000,
  whatsAppMessagesUsed: 4210,
  billingCycleEnd: 'August 12, 2026',
  costPerAdditionalLead: 0.10,
  subscriptionPrice: 129
};
