import { Response, NextFunction } from 'express';
import { AnalyticsService } from './analytics.service';
import { AuthRequest } from '../../middleware/auth.middleware';
export class AnalyticsController {
    static async getDashboard(req, res, next) {
        try {
            const metrics = await AnalyticsService.getDashboardMetrics(req.user.organizationId);
            res.status(200).json({ success: true, data: metrics });
        }
        catch (error) {
            next(error);
        }
    }
    static async getSources(req, res, next) {
        try {
            const sources = await AnalyticsService.getLeadSourceDistribution(req.user.organizationId);
            res.status(200).json({ success: true, data: sources });
        }
        catch (error) {
            next(error);
        }
    }
    static async getSalesPerformance(req, res, next) {
        try {
            const performance = await AnalyticsService.getSalesPerformance(req.user.organizationId);
            res.status(200).json({ success: true, data: performance });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=analytics.controller.js.map