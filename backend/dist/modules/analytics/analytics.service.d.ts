export declare class AnalyticsService {
    static getDashboardMetrics(organizationId: string): Promise<{
        totalLeads: number;
        qualifiedLeads: number;
        newLeads: number;
        conversionRate: string;
    }>;
    static getLeadSourceDistribution(organizationId: string): Promise<{
        source: string;
        count: number;
    }[]>;
    static getSalesPerformance(organizationId: string): Promise<{
        userId: string;
        name: string;
        activeLeads: number;
    }[]>;
}
