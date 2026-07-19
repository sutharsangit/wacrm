export declare class WebhooksService {
    static processMetaLead(organizationId: string, payload: any): Promise<{
        id: string;
        organizationId: string;
        name: string;
        phone: string | null;
        email: string | null;
        company: string | null;
        leadSource: string;
        campaign: string | null;
        currentStatus: string;
        leadScore: number;
        qualificationStatus: string | null;
        priority: string;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    static processGoogleLead(organizationId: string, payload: any): Promise<{
        id: string;
        organizationId: string;
        name: string;
        phone: string | null;
        email: string | null;
        company: string | null;
        leadSource: string;
        campaign: string | null;
        currentStatus: string;
        leadScore: number;
        qualificationStatus: string | null;
        priority: string;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    static verifyMetaSignature(payload: string, signature: string, appSecret: string): boolean;
}
