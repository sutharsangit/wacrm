import { Prisma } from '@prisma/client';
export declare class LeadsService {
    static createLead(organizationId: string, createdById: string, data: any): Promise<{
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
    static listLeads(organizationId: string, query: any): Promise<{
        data: ({
            assignments: ({
                user: {
                    firstName: string;
                    id: string;
                    lastName: string;
                };
            } & {
                id: string;
                leadId: string;
                userId: string;
                assignedAt: Date;
                active: boolean;
            })[];
        } & {
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    static getLeadById(organizationId: string, leadId: string): Promise<{
        assignments: ({
            user: {
                firstName: string;
                id: string;
                lastName: string;
            };
        } & {
            id: string;
            leadId: string;
            userId: string;
            assignedAt: Date;
            active: boolean;
        })[];
        notes: ({
            user: {
                firstName: string;
            };
        } & {
            id: string;
            leadId: string;
            userId: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        })[];
        timelines: {
            id: string;
            leadId: string;
            action: string;
            description: string | null;
            createdAt: Date;
        }[];
    } & {
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
    static updateLead(organizationId: string, leadId: string, data: any, userId: string): Promise<{
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
    static assignLead(organizationId: string, leadId: string, userId: string): Promise<{
        id: string;
        leadId: string;
        userId: string;
        assignedAt: Date;
        active: boolean;
    }>;
    static bulkUpdate(organizationId: string, leadIds: string[], data: any): Promise<Prisma.BatchPayload>;
    static deleteLead(organizationId: string, leadId: string): Promise<{
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
}
