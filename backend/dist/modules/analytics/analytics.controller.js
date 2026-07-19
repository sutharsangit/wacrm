"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
class AnalyticsController {
    static async getDashboard(req, res, next) {
        try {
            const metrics = await analytics_service_1.AnalyticsService.getDashboardMetrics(req.user.organizationId);
            res.status(200).json({ success: true, data: metrics });
        }
        catch (error) {
            next(error);
        }
    }
    static async getSources(req, res, next) {
        try {
            const sources = await analytics_service_1.AnalyticsService.getLeadSourceDistribution(req.user.organizationId);
            res.status(200).json({ success: true, data: sources });
        }
        catch (error) {
            next(error);
        }
    }
    static async getSalesPerformance(req, res, next) {
        try {
            const performance = await analytics_service_1.AnalyticsService.getSalesPerformance(req.user.organizationId);
            res.status(200).json({ success: true, data: performance });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AnalyticsController = AnalyticsController;
//# sourceMappingURL=analytics.controller.js.map