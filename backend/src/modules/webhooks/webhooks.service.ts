import { prisma } from '../../server';
import crypto from 'crypto';

export class WebhooksService {
  static async processMetaLead(organizationId: string, payload: any) {
    // 1. Log webhook
    const webhook = await prisma.webhook.findFirst({
      where: { organizationId, source: 'Meta Ads', isActive: true },
    });

    if (webhook) {
      await prisma.webhookLog.create({
        data: {
          webhookId: webhook.id,
          payload,
          status: 'Success',
        },
      });
    }

    // 2. Extract Lead Data (Simplified Meta Webhook Payload parsing)
    // In reality, you'd need to fetch lead details using leadgen_id from Meta API if only ID is provided.
    // For this implementation, assuming payload has some mapped data or we fetch it.
    const leadData = {
      name: payload.full_name || 'Meta Lead',
      email: payload.email,
      phone: payload.phone_number,
      company: payload.company_name,
      leadSource: 'Meta Ads',
      campaign: payload.campaign_name || 'Unknown Campaign',
    };

    // 3. Create Lead
    const lead = await prisma.lead.create({
      data: {
        ...leadData,
        organizationId,
      },
    });

    await prisma.leadTimeline.create({
      data: {
        leadId: lead.id,
        action: 'Created',
        description: `Lead created via Meta Ads Webhook`,
      },
    });

    return lead;
  }

  static async processGoogleLead(organizationId: string, payload: any) {
    const webhook = await prisma.webhook.findFirst({
      where: { organizationId, source: 'Google Ads', isActive: true },
    });

    if (webhook) {
      await prisma.webhookLog.create({
        data: {
          webhookId: webhook.id,
          payload,
          status: 'Success',
        },
      });
    }

    // Google Lead Form Webhook parsing
    const userColumnData = payload.user_column_data || [];
    const getField = (colName: string) =>
      userColumnData.find((c: any) => c.column_name === colName)?.string_value;

    const leadData = {
      name: getField('Full Name') || 'Google Lead',
      email: getField('User Email'),
      phone: getField('User Phone'),
      company: getField('Company Name'),
      leadSource: 'Google Ads',
      campaign: payload.campaign_id || 'Unknown Campaign',
    };

    const lead = await prisma.lead.create({
      data: {
        ...leadData,
        organizationId,
      },
    });

    await prisma.leadTimeline.create({
      data: {
        leadId: lead.id,
        action: 'Created',
        description: `Lead created via Google Ads Webhook`,
      },
    });

    return lead;
  }

  static verifyMetaSignature(payload: string, signature: string, appSecret: string) {
    const expectedSignature = crypto
      .createHmac('sha256', appSecret)
      .update(payload)
      .digest('hex');
    return signature === `sha256=${expectedSignature}`;
  }
}
