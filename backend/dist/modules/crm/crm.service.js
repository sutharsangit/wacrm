"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmService = void 0;
const server_1 = require("../../server");
class CrmService {
    static async addNote(organizationId, userId, data) {
        // Ensure lead belongs to org
        const lead = await server_1.prisma.lead.findFirst({ where: { id: data.leadId, organizationId } });
        if (!lead)
            throw new Error('Lead not found');
        const note = await server_1.prisma.note.create({
            data: {
                leadId: data.leadId,
                userId,
                content: data.content,
            },
        });
        await server_1.prisma.leadTimeline.create({
            data: {
                leadId: data.leadId,
                action: 'Note Added',
                description: `Note added by user ${userId}`,
            },
        });
        return note;
    }
    static async addCallLog(organizationId, userId, data) {
        const lead = await server_1.prisma.lead.findFirst({ where: { id: data.leadId, organizationId } });
        if (!lead)
            throw new Error('Lead not found');
        const callLog = await server_1.prisma.callLog.create({
            data: {
                leadId: data.leadId,
                userId,
                callDate: new Date(data.callDate),
                duration: data.duration,
                outcome: data.outcome,
                remarks: data.remarks,
            },
        });
        await server_1.prisma.leadTimeline.create({
            data: {
                leadId: data.leadId,
                action: 'Call Logged',
                description: `Call outcome: ${data.outcome}`,
            },
        });
        return callLog;
    }
    static async createFollowUp(organizationId, userId, data) {
        const lead = await server_1.prisma.lead.findFirst({ where: { id: data.leadId, organizationId } });
        if (!lead)
            throw new Error('Lead not found');
        const followUp = await server_1.prisma.followUp.create({
            data: {
                leadId: data.leadId,
                userId,
                dueDate: new Date(data.dueDate),
                taskType: data.taskType,
                notes: data.notes,
            },
        });
        return followUp;
    }
    static async updateFollowUp(organizationId, followUpId, data) {
        const followUp = await server_1.prisma.followUp.findFirst({
            where: { id: followUpId, lead: { organizationId } },
        });
        if (!followUp)
            throw new Error('Follow-up not found');
        return server_1.prisma.followUp.update({
            where: { id: followUpId },
            data,
        });
    }
    static async listFollowUps(organizationId, userId) {
        return server_1.prisma.followUp.findMany({
            where: {
                lead: { organizationId },
                ...(userId && { userId }),
                status: 'Pending',
            },
            include: {
                lead: { select: { name: true, currentStatus: true } },
            },
            orderBy: { dueDate: 'asc' },
        });
    }
}
exports.CrmService = CrmService;
//# sourceMappingURL=crm.service.js.map