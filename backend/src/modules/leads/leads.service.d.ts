export declare class LeadsService {
    static createLead(organizationId: string, createdById: string, data: any): Promise<any>;
    static listLeads(organizationId: string, query: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    static getLeadById(organizationId: string, leadId: string): Promise<any>;
    static updateLead(organizationId: string, leadId: string, data: any, userId: string): Promise<any>;
    static assignLead(organizationId: string, leadId: string, userId: string): Promise<any>;
    static bulkUpdate(organizationId: string, leadIds: string[], data: any): Promise<any>;
    static deleteLead(organizationId: string, leadId: string): Promise<any>;
}
//# sourceMappingURL=leads.service.d.ts.map