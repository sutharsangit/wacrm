import { prisma } from '../../server';

export class AnalyticsService {
  static async getDashboardMetrics(organizationId: string) {
    const [totalLeads, qualifiedLeads, newLeads, hotLeads] = await Promise.all([
      prisma.lead.count({ where: { organizationId, deletedAt: null } }),
      prisma.lead.count({
        where: { organizationId, deletedAt: null, qualificationStatus: { in: ['Hot', 'Warm'] } },
      }),
      prisma.lead.count({
        where: { organizationId, deletedAt: null, currentStatus: 'New' },
      }),
      prisma.lead.count({
        where: { organizationId, deletedAt: null, qualificationStatus: 'Hot' },
      }),
    ]);

    const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;

    return {
      totalLeads,
      qualifiedLeads,
      newLeads,
      hotLeads,
      conversionRate: conversionRate.toFixed(2),
    };
  }

  static async getLeadSourceDistribution(organizationId: string) {
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

  static async getQualificationDistribution(organizationId: string) {
    const distribution = await prisma.lead.groupBy({
      by: ['qualificationStatus'],
      where: { organizationId, deletedAt: null, qualificationStatus: { not: null } },
      _count: { qualificationStatus: true },
    });

    return distribution.map((d) => ({
      status: d.qualificationStatus || 'Unqualified',
      count: d._count.qualificationStatus,
    }));
  }

  static async getSalesPerformance(organizationId: string) {
    const performance = await prisma.leadAssignment.groupBy({
      by: ['userId'],
      where: { lead: { organizationId, deletedAt: null }, active: true },
      _count: { userId: true },
    });

    // Populate user details
    const populated = await Promise.all(
      performance.map(async (p) => {
        const user = await prisma.user.findUnique({ where: { id: p.userId } });
        return {
          userId: p.userId,
          name: user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Unknown',
          activeLeads: p._count.userId,
        };
      })
    );

    return populated;
  }

  static async getLeadTrafficTrends(organizationId: string) {
    const leads = await prisma.lead.findMany({
      where: { organizationId, deletedAt: null },
      select: { createdAt: true, qualificationStatus: true }
    });
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trendsMap: Record<string, { total: number, qualified: number }> = {};
    
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${months[d.getMonth()]}`;
      trendsMap[key] = { total: 0, qualified: 0 };
    }
    
    leads.forEach(lead => {
      const d = new Date(lead.createdAt);
      const key = `${months[d.getMonth()]}`;
      if (trendsMap[key]) {
        trendsMap[key].total += 1;
        if (lead.qualificationStatus === 'Hot' || lead.qualificationStatus === 'Warm') {
          trendsMap[key].qualified += 1;
        }
      }
    });

    return Object.keys(trendsMap).map(month => ({
      month,
      leads: trendsMap[month].total,
      qualified: trendsMap[month].qualified
    }));
  }
}
