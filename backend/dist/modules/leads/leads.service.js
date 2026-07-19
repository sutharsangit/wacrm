"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const server_1 = require("../../server");
class LeadsService {
    static async createLead(organizationId, createdById, data) {
        const lead = await server_1.prisma.lead.create({
            data: {
                ...data,
                organizationId,
                createdById,
            },
        });
        await server_1.prisma.leadTimeline.create({
            data: {
                leadId: lead.id,
                action: 'Created',
                description: `Lead created manually`,
            },
        });
        return lead;
    }
    static async listLeads(organizationId, query) {
        const { page = 1, limit = 50, search, status, source } = query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {
            organizationId,
            deletedAt: null,
            ...(status && { currentStatus: String(status) }),
            ...(source && { leadSource: String(source) }),
            ...(search && {
                OR: [
                    { name: { contains: String(search), mode: 'insensitive' } },
                    { email: { contains: String(search), mode: 'insensitive' } },
                    { phone: { contains: String(search), mode: 'insensitive' } },
                ],
            }),
        };
        const [data, total] = await Promise.all([
            server_1.prisma.lead.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
                include: {
                    assignments: {
                        where: { active: true },
                        include: { user: { select: { id: true, firstName: true, lastName: true } } },
                    },
                },
            }),
            server_1.prisma.lead.count({ where }),
        ]);
        return { data, total, page: Number(page), limit: Number(limit) };
    }
    static async getLeadById(organizationId, leadId) {
        return server_1.prisma.lead.findFirst({
            where: { id: leadId, organizationId, deletedAt: null },
            include: {
                assignments: {
                    include: { user: { select: { id: true, firstName: true, lastName: true } } },
                },
                timelines: { orderBy: { createdAt: 'desc' } },
                notes: { orderBy: { createdAt: 'desc' }, include: { user: { select: { firstName: true } } } },
            },
        });
    }
    static async updateLead(organizationId, leadId, data, userId) {
        const lead = await server_1.prisma.lead.update({
            where: { id: leadId, organizationId },
            data,
        });
        if (data.currentStatus) {
            await server_1.prisma.leadTimeline.create({
                data: {
                    leadId,
                    action: 'Status Changed',
                    description: `Status changed to ${data.currentStatus}`,
                },
            });
            await server_1.prisma.leadStatusHistory.create({
                data: {
                    leadId,
                    toStatus: data.currentStatus,
                    changedBy: userId,
                },
            });
        }
        return lead;
    }
    static async assignLead(organizationId, leadId, userId) {
        // Deactivate current active assignments
        await server_1.prisma.leadAssignment.updateMany({
            where: { leadId, active: true },
            data: { active: false },
        });
        const assignment = await server_1.prisma.leadAssignment.create({
            data: {
                leadId,
                userId,
            },
        });
        await server_1.prisma.leadTimeline.create({
            data: {
                leadId,
                action: 'Assigned',
                description: `Lead assigned to user ${userId}`,
            },
        });
        return assignment;
    }
    static async bulkUpdate(organizationId, leadIds, data) {
        return server_1.prisma.lead.updateMany({
            where: { id: { in: leadIds }, organizationId },
            data,
        });
    }
    static async deleteLead(organizationId, leadId) {
        return server_1.prisma.lead.update({
            where: { id: leadId, organizationId },
            data: { deletedAt: new Date() },
        });
    }
}
exports.LeadsService = LeadsService;
//# sourceMappingURL=leads.service.js.map