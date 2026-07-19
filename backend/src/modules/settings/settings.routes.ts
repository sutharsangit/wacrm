import { Router } from 'express';
import { SettingsController } from './settings.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { updateSettingSchema } from './settings.schema';

const router = Router();

router.use(authenticate);

router.get('/', authorize(['settings:read']), SettingsController.get);
router.post('/', authorize(['settings:write']), validate(updateSettingSchema), SettingsController.update);

export default router;
