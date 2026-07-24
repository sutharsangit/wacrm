import { prisma } from '../../server';
import { Prisma } from '@prisma/client';

export class LeadsService {
  static async createLead(organizationId: string, createdById: string, data: any) {
    const lead = await prisma.lead.create({
      data: {
        ...data,
        organizationId,
        createdById,
      },
    });

    await prisma.leadTimeline.create({
      data: {
        leadId: lead.id,
        action: 'Created',
        description: `Lead created manually`,
      },
    });

    return lead;
  }

  static async listLeads(organizationId: string, query: any) {
    const { page = 1, limit = 50, search, status, source } = query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {
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
      prisma.lead.findMany({
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
      prisma.lead.count({ where }),
    ]);

    return { data, total, page: Number(page), limit: Number(limit) };
  }

  static async getLeadById(organizationId: string, leadId: string) {
    return prisma.lead.findFirst({
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

  static async updateLead(organizationId: string, leadId: string, data: any, userId: string) {
    const lead = await prisma.lead.update({
      where: { id: leadId, organizationId },
      data,
    });

    if (data.currentStatus) {
      await prisma.leadTimeline.create({
        data: {
          leadId,
          action: 'Status Changed',
          description: `Status changed to ${data.currentStatus}`,
        },
      });
      await prisma.leadStatusHistory.create({
        data: {
          leadId,
          toStatus: data.currentStatus,
          changedBy: userId,
        },
      });
    }

    return lead;
  }

  static async assignLead(organizationId: string, leadId: string, userId: string) {
    // Deactivate current active assignments
    await prisma.leadAssignment.updateMany({
      where: { leadId, active: true },
      data: { active: false },
    });

    const assignment = await prisma.leadAssignment.create({
      data: {
        leadId,
        userId,
      },
    });

    await prisma.leadTimeline.create({
      data: {
        leadId,
        action: 'Assigned',
        description: `Lead assigned to user ${userId}`,
      },
    });

    return assignment;
  }

  static async bulkUpdate(organizationId: string, leadIds: string[], data: any) {
    return prisma.lead.updateMany({
      where: { id: { in: leadIds }, organizationId },
      data,
    });
  }

  static async deleteLead(organizationId: string, leadId: string) {
    return prisma.lead.update({
      where: { id: leadId, organizationId },
      data: { deletedAt: new Date() },
    });
  }

  static async processCsvUpload(organizationId: string, createdById: string, fileBuffer: Buffer) {
    const csv = require('csv-parser');
    const { Readable } = require('stream');

    const results: any[] = [];
    const stream = Readable.from(fileBuffer);

    return new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (data: any) => results.push(data))
        .on('end', async () => {
          try {
            const leadsToInsert = results.map((row) => {
              const name = row.name || row.Name || 'Unknown Lead';
              const email = row.email || row.Email || null;
              const phone = row['contact number'] || row['Contact Number'] || row.phone || row.Phone || null;
              const leadSource = row['lead base'] || row['Lead Base'] || 'CSV Upload';
              const typeStr = (row.type || row.Type || 'Cold').toLowerCase();

              // Classification Logic based on "type"
              let qualificationStatus = 'Cold';
              let priority = 'Low';
              let leadScore = 10;

              if (typeStr.includes('hot')) {
                qualificationStatus = 'Hot';
                priority = 'High';
                leadScore = 90;
              } else if (typeStr.includes('warm')) {
                qualificationStatus = 'Warm';
                priority = 'Medium';
                leadScore = 50;
              }

              return {
                organizationId,
                createdById,
                name,
                email,
                phone,
                leadSource,
                currentStatus: 'New',
                qualificationStatus,
                priority,
                leadScore,
              };
            });

            // Bulk insert
            const created = await prisma.lead.createMany({
              data: leadsToInsert,
              skipDuplicates: true, // Optional: if you had a unique constraint
            });

            resolve({
              processedCount: results.length,
              insertedCount: created.count,
            });
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error: any) => {
          reject(error);
        });
    });
  }
}
