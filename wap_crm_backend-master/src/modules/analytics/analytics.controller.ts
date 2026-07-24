import { Response, NextFunction } from 'express';
import { AnalyticsService } from './analytics.service';
import { AuthRequest } from '../../middleware/auth.middleware';

export class AnalyticsController {
  static async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const metrics = await AnalyticsService.getDashboardMetrics(req.user!.organizationId);
      res.status(200).json({ success: true, data: metrics });
    } catch (error) {
      next(error);
    }
  }

  static async getSources(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const sources = await AnalyticsService.getLeadSourceDistribution(req.user!.organizationId);
      res.status(200).json({ success: true, data: sources });
    } catch (error) {
      next(error);
    }
  }

  static async getQualifications(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const qualifications = await AnalyticsService.getQualificationDistribution(req.user!.organizationId);
      res.status(200).json({ success: true, data: qualifications });
    } catch (error) {
      next(error);
    }
  }

  static async getSalesPerformance(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const performance = await AnalyticsService.getSalesPerformance(req.user!.organizationId);
      res.status(200).json({ success: true, data: performance });
    } catch (error) {
      next(error);
    }
  }

  static async getTrends(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const trends = await AnalyticsService.getLeadTrafficTrends(req.user!.organizationId);
      res.status(200).json({ success: true, data: trends });
    } catch (error) {
      next(error);
    }
  }
}
