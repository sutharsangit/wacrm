import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';
const router = Router();
router.use(authenticate);
router.get('/dashboard', authorize(['analytics:read']), AnalyticsController.getDashboard);
router.get('/sources', authorize(['analytics:read']), AnalyticsController.getSources);
router.get('/sales-performance', authorize(['analytics:read']), AnalyticsController.getSalesPerformance);
export default router;
//# sourceMappingURL=analytics.routes.js.map