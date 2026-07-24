import { Response, NextFunction } from 'express';
import { CrmService } from './crm.service';
import { AuthRequest } from '../../middleware/auth.middleware';

export class CrmController {
  static async addNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const note = await CrmService.addNote(req.user!.organizationId, req.user!.id, req.body);
      res.status(201).json({ success: true, message: 'Note added successfully', data: note });
    } catch (error) {
      next(error);
    }
  }

  static async addCallLog(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const callLog = await CrmService.addCallLog(req.user!.organizationId, req.user!.id, req.body);
      res.status(201).json({ success: true, message: 'Call logged successfully', data: callLog });
    } catch (error) {
      next(error);
    }
  }

  static async createFollowUp(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const followUp = await CrmService.createFollowUp(req.user!.organizationId, req.user!.id, req.body);
      res.status(201).json({ success: true, message: 'Follow-up created successfully', data: followUp });
    } catch (error) {
      next(error);
    }
  }

  static async updateFollowUp(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const followUp = await CrmService.updateFollowUp(req.user!.organizationId, req.params.id as string, req.body);
      res.status(200).json({ success: true, message: 'Follow-up updated successfully', data: followUp });
    } catch (error) {
      next(error);
    }
  }

  static async listFollowUps(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // By default list user's followups. If they have permission, they could list all for the org.
      const userId = req.query.all ? undefined : req.user!.id;
      const followUps = await CrmService.listFollowUps(req.user!.organizationId, userId);
      res.status(200).json({ success: true, data: followUps });
    } catch (error) {
      next(error);
    }
  }
}
