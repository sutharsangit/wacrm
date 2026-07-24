import { prisma } from '../../server';

export class CrmService {
  static async addNote(organizationId: string, userId: string, data: any) {
    // Ensure lead belongs to org
    const lead = await prisma.lead.findFirst({ where: { id: data.leadId, organizationId } });
    if (!lead) throw new Error('Lead not found');

    const note = await prisma.note.create({
      data: {
        leadId: data.leadId,
        userId,
        content: data.content,
      },
    });

    await prisma.leadTimeline.create({
      data: {
        leadId: data.leadId,
        action: 'Note Added',
        description: `Note added by user ${userId}`,
      },
    });

    return note;
  }

  static async addCallLog(organizationId: string, userId: string, data: any) {
    const lead = await prisma.lead.findFirst({ where: { id: data.leadId, organizationId } });
    if (!lead) throw new Error('Lead not found');

    const callLog = await prisma.callLog.create({
      data: {
        leadId: data.leadId,
        userId,
        callDate: new Date(data.callDate),
        duration: data.duration,
        outcome: data.outcome,
        remarks: data.remarks,
      },
    });

    await prisma.leadTimeline.create({
      data: {
        leadId: data.leadId,
        action: 'Call Logged',
        description: `Call outcome: ${data.outcome}`,
      },
    });

    return callLog;
  }

  static async createFollowUp(organizationId: string, userId: string, data: any) {
    const lead = await prisma.lead.findFirst({ where: { id: data.leadId, organizationId } });
    if (!lead) throw new Error('Lead not found');

    const followUp = await prisma.followUp.create({
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

  static async updateFollowUp(organizationId: string, followUpId: string, data: any) {
    const followUp = await prisma.followUp.findFirst({
      where: { id: followUpId, lead: { organizationId } },
    });
    if (!followUp) throw new Error('Follow-up not found');

    return prisma.followUp.update({
      where: { id: followUpId },
      data,
    });
  }

  static async listFollowUps(organizationId: string, userId?: string) {
    return prisma.followUp.findMany({
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
