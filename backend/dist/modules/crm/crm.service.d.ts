export declare class CrmService {
    static addNote(organizationId: string, userId: string, data: any): Promise<{
        id: string;
        leadId: string;
        userId: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    static addCallLog(organizationId: string, userId: string, data: any): Promise<{
        id: string;
        leadId: string;
        userId: string;
        callDate: Date;
        duration: number | null;
        outcome: string;
        remarks: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static createFollowUp(organizationId: string, userId: string, data: any): Promise<{
        id: string;
        leadId: string;
        userId: string;
        dueDate: Date;
        taskType: string;
        status: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static updateFollowUp(organizationId: string, followUpId: string, data: any): Promise<{
        id: string;
        leadId: string;
        userId: string;
        dueDate: Date;
        taskType: string;
        status: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static listFollowUps(organizationId: string, userId?: string): Promise<({
        lead: {
            currentStatus: string;
            name: string;
        };
    } & {
        id: string;
        leadId: string;
        userId: string;
        dueDate: Date;
        taskType: string;
        status: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
