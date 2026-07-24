import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';

export class WhatsappController {
  // POST /whatsapp/connect
  static async connect(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        success: true,
        message: 'WhatsApp onboarding wizard initiated successfully',
        data: {
          status: 'pending_verification',
          step: 'business_details',
          connectType: req.body.type || 'api',
          createdAt: new Date().toISOString()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /whatsapp/verify
  static async verify(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { phone, verifyMethod } = req.body;
      res.status(200).json({
        success: true,
        message: 'Business verification document and phone status processed successfully',
        data: {
          verified: true,
          phone: phone || '+1 555-019-2834',
          verifyMethod: verifyMethod || 'gst',
          status: 'connected',
          messagingTier: 'Tier 1 (1k/day)',
          updatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /whatsapp/send
  static async send(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { recipient, text } = req.body;
      res.status(200).json({
        success: true,
        message: 'Message sent successfully',
        data: {
          messageId: `msg_${Date.now()}`,
          recipient: recipient || '+1 555-019-2834',
          text: text || 'Mock reply message',
          status: 'sent',
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /whatsapp/messages
  static async getMessages(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        success: true,
        message: 'Fetched message threads successfully',
        data: [
          {
            id: 'm-1',
            leadId: 'l-1',
            sender: 'lead',
            text: 'Hello, I want to learn more about the pricing.',
            timestamp: new Date().toISOString(),
            status: 'read'
          },
          {
            id: 'm-2',
            leadId: 'l-1',
            sender: 'ai',
            text: 'Hi John! I can help you with that. Our pricing starts at $49/mo.',
            timestamp: new Date().toISOString(),
            status: 'read'
          }
        ]
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /whatsapp/templates
  static async getTemplates(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        success: true,
        message: 'Fetched approved WhatsApp message templates',
        data: [
          {
            id: 't-1',
            name: 'welcome_customer',
            category: 'Marketing',
            body: 'Hi {{name}}, thanks for contacting us. We have received your inquiry.',
            status: 'APPROVED'
          },
          {
            id: 't-2',
            name: 'qualification_budget',
            category: 'Utility',
            body: 'Hi {{name}}, to help customize your quote, could you share your budget?',
            status: 'APPROVED'
          }
        ]
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /broadcast/send
  static async sendBroadcast(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { campaignName, templateId } = req.body;
      res.status(201).json({
        success: true,
        message: 'Broadcast campaign queued for delivery',
        data: {
          campaignId: `camp_${Date.now()}`,
          name: campaignName || 'Unnamed Broadcast',
          templateId: templateId || 't-1',
          status: 'Pending',
          sentCount: 250,
          deliveredCount: 0,
          readCount: 0,
          createdAt: new Date().toISOString()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /campaigns
  static async getCampaigns(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        success: true,
        message: 'Campaign lists retrieved successfully',
        data: [
          {
            id: 'camp-1',
            name: 'August Casting Callout',
            templateName: 'welcome_customer',
            status: 'Completed',
            sentCount: 250,
            deliveredCount: 242,
            readCount: 185,
            createdAt: new Date().toISOString()
          }
        ]
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /contacts
  static async getContacts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        success: true,
        message: 'WhatsApp synchronized contacts fetched successfully',
        data: [
          {
            id: 'c-1',
            name: 'John Doe',
            phone: '+1 555-019-2834',
            source: 'Meta Ads',
            score: 85,
            status: 'Qualified',
            lastMessage: 'Let me think about it.',
            updatedAt: new Date().toISOString()
          },
          {
            id: 'c-2',
            name: 'Alice Smith',
            phone: '+1 555-014-9982',
            source: 'Google Ads',
            score: 62,
            status: 'Contacted',
            lastMessage: 'Awesome, thanks!',
            updatedAt: new Date().toISOString()
          }
        ]
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /qualification/start
  static async startQualification(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { leadId } = req.body;
      res.status(200).json({
        success: true,
        message: 'AI Lead qualification screening flow initiated',
        data: {
          leadId: leadId || 'lead-1',
          status: 'screening_active',
          currentQuestionIndex: 0,
          totalQuestions: 5,
          score: 0,
          updatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /qualification/submit
  static async submitQualification(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { leadId, answerIndex, textAnswer } = req.body;
      res.status(200).json({
        success: true,
        message: 'Lead qualification response parsed and scoring updated',
        data: {
          leadId: leadId || 'lead-1',
          status: 'screening_completed',
          score: 88,
          qualificationState: 'Hot',
          lastAnswer: textAnswer || 'Yes, I want a demo call',
          updatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
