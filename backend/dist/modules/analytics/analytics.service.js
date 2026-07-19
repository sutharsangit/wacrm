"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const server_1 = require("../../server");
class AnalyticsService {
    static async getDashboardMetrics(organizationId) {
        const [totalLeads, qualifiedLeads, newLeads] = await Promise.all([
            server_1.prisma.lead.count({ where: { organizationId, deletedAt: null } }),
            server_1.prisma.lead.count({
                where: { organizationId, deletedAt: null, currentStatus: 'Qualified' },
            }),
            server_1.prisma.lead.count({
                where: { organizationId, deletedAt: null, currentStatus: 'New' },
            }),
        ]);
        const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;
        return {
            totalLeads,
            qualifiedLeads,
            newLeads,
            conversionRate: conversionRate.toFixed(2),
        };
    }
    static async getLeadSourceDistribution(organizationId) {
        const distribution = await server_1.prisma.lead.groupBy({
            by: ['leadSource'],
            where: { organizationId, deletedAt: null },
            _count: { leadSource: true },
        });
        return distribution.map((d) => ({
            source: d.leadSource,
            count: d._count.leadSource,
        }));
    }
    static async getSalesPerformance(organizationId) {
        const performance = await server_1.prisma.leadAssignment.groupBy({
            by: ['userId'],
            where: { lead: { organizationId, deletedAt: null }, active: true },
            _count: { userId: true },
        });
        // Populate user details
        const populated = await Promise.all(performance.map(async (p) => {
            const user = await server_1.prisma.user.findUnique({ where: { id: p.userId } });
            return {
                userId: p.userId,
                name: user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Unknown',
                activeLeads: p._count.userId,
            };
        }));
        return populated;
    }
}
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=analytics.service.js.map