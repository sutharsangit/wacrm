import { Router } from 'express';
import { BillingController } from './billing.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { createSubscriptionSchema } from './billing.schema';

const router = Router();

router.use(authenticate);

router.get('/', authorize(['billing:read']), BillingController.get);
router.post('/', authorize(['billing:write']), validate(createSubscriptionSchema), BillingController.create);
router.delete('/:id', authorize(['billing:write']), BillingController.cancel);

export default router;
