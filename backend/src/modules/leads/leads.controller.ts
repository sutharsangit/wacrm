import { Response, NextFunction } from 'express';
import { LeadsService } from './leads.service';
import { AuthRequest } from '../../middleware/auth.middleware';

export class LeadsController {
  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const lead = await LeadsService.createLead(req.user!.organizationId, req.user!.id, req.body);
      res.status(201).json({ success: true, message: 'Lead created successfully', data: lead });
    } catch (error) {
      next(error);
    }
  }

  static async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await LeadsService.listLeads(req.user!.organizationId, req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const lead = await LeadsService.getLeadById(req.user!.organizationId, req.params.id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found' });
      }
      res.status(200).json({ success: true, data: lead });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const lead = await LeadsService.updateLead(req.user!.organizationId, req.params.id, req.body, req.user!.id);
      res.status(200).json({ success: true, message: 'Lead updated successfully', data: lead });
    } catch (error) {
      next(error);
    }
  }

  static async assign(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const assignment = await LeadsService.assignLead(req.user!.organizationId, req.params.id, req.body.userId);
      res.status(200).json({ success: true, message: 'Lead assigned successfully', data: assignment });
    } catch (error) {
      next(error);
    }
  }

  static async bulkUpdate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { leadIds, data } = req.body;
      const result = await LeadsService.bulkUpdate(req.user!.organizationId, leadIds, data);
      res.status(200).json({ success: true, message: 'Leads updated successfully', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await LeadsService.deleteLead(req.user!.organizationId, req.params.id);
      res.status(200).json({ success: true, message: 'Lead deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
