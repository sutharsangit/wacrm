import { prisma } from '../../server';
export class AnalyticsService {
    static async getDashboardMetrics(organizationId) {
        const [totalLeads, qualifiedLeads, newLeads] = await Promise.all([
            prisma.lead.count({ where: { organizationId, deletedAt: null } }),
            prisma.lead.count({
                where: { organizationId, deletedAt: null, currentStatus: 'Qualified' },
            }),
            prisma.lead.count({
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
        const distribution = await prisma.lead.groupBy({
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
        const performance = await prisma.leadAssignment.groupBy({
            by: ['userId'],
            where: { lead: { organizationId, deletedAt: null }, active: true },
            _count: { userId: true },
        });
        // Populate user details
        const populated = await Promise.all(performance.map(async (p) => {
            const user = await prisma.user.findUnique({ where: { id: p.userId } });
            return {
                userId: p.userId,
                name: user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Unknown',
                activeLeads: p._count.userId,
            };
        }));
        return populated;
    }
}
//# sourceMappingURL=analytics.service.js.map