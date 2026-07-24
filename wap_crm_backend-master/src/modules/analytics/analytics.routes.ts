import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/dashboard', authorize(['analytics:read']), AnalyticsController.getDashboard);
router.get('/sources', authorize(['analytics:read']), AnalyticsController.getSources);
router.get('/qualifications', authorize(['analytics:read']), AnalyticsController.getQualifications);
router.get('/sales-performance', authorize(['analytics:read']), AnalyticsController.getSalesPerformance);
router.get('/trends', authorize(['analytics:read']), AnalyticsController.getTrends);

export default router;
