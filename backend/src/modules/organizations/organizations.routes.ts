import { Router } from 'express';
import { OrganizationsController } from './organizations.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { updateOrganizationSchema } from './organizations.schema';

const router = Router();

// Protect all routes
router.use(authenticate);

router.get('/', OrganizationsController.get);
router.put('/', authorize(['organization:write']), validate(updateOrganizationSchema), OrganizationsController.update);

export default router;
