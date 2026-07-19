export declare class CrmService {
    static addNote(organizationId: string, userId: string, data: any): Promise<any>;
    static addCallLog(organizationId: string, userId: string, data: any): Promise<any>;
    static createFollowUp(organizationId: string, userId: string, data: any): Promise<any>;
    static updateFollowUp(organizationId: string, followUpId: string, data: any): Promise<any>;
    static listFollowUps(organizationId: string, userId?: string): Promise<any>;
}
//# sourceMappingURL=crm.service.d.ts.map