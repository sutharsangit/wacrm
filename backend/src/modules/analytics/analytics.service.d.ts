export declare class AnalyticsService {
    static getDashboardMetrics(organizationId: string): Promise<{
        totalLeads: any;
        qualifiedLeads: any;
        newLeads: any;
        conversionRate: string;
    }>;
    static getLeadSourceDistribution(organizationId: string): Promise<any>;
    static getSalesPerformance(organizationId: string): Promise<any>;
}
//# sourceMappingURL=analytics.service.d.ts.map