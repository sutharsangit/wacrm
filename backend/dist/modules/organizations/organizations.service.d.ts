export declare class OrganizationsService {
    static getOrganization(id: string): Promise<{
        settings: {
            id: string;
            organizationId: string;
            key: string;
            value: import("@prisma/client/runtime/library").JsonValue;
            createdAt: Date;
            updatedAt: Date;
        }[];
        subscriptions: {
            id: string;
            organizationId: string;
            plan: string;
            status: string;
            billingCycle: string;
            renewalDate: Date;
            razorpaySubId: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        name: string;
        industry: string | null;
        address: string | null;
        timezone: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    static updateOrganization(id: string, data: any): Promise<{
        id: string;
        name: string;
        industry: string | null;
        address: string | null;
        timezone: string;
        logoUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
