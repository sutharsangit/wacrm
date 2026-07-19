import { Router } from 'express';
import { WebhooksController } from './webhooks.controller';
const router = Router();
// Webhooks don't use standard JWT auth because they are called by external services (Meta/Google).
// Normally we'd use a secret token verification here.
router.get('/meta/:orgId', WebhooksController.metaWebhook);
router.post('/meta/:orgId', WebhooksController.metaWebhook);
router.post('/google/:orgId', WebhooksController.googleWebhook);
export default router;
//# sourceMappingURL=webhooks.routes.js.map