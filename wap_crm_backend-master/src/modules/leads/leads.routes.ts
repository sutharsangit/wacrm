import { Router } from 'express';
import multer from 'multer';
import { LeadsController } from './leads.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import {
  createLeadSchema,
  updateLeadSchema,
  bulkUpdateSchema,
  assignLeadSchema,
  bulkAssignSchema,
} from './leads.schema';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authenticate);

router.post('/upload-csv', authorize(['leads:write']), upload.single('file'), LeadsController.uploadCsv);
router.post('/', authorize(['leads:write']), validate(createLeadSchema), LeadsController.create);
router.get('/', authorize(['leads:read']), LeadsController.list);
router.get('/:id', authorize(['leads:read']), LeadsController.getById);
router.put('/:id', authorize(['leads:write']), validate(updateLeadSchema), LeadsController.update);
router.delete('/:id', authorize(['leads:delete']), LeadsController.delete);

// Assignments
router.post('/:id/assign', authorize(['leads:assign']), validate(assignLeadSchema), LeadsController.assign);

// Bulk Operations
router.post('/bulk-update', authorize(['leads:write']), validate(bulkUpdateSchema), LeadsController.bulkUpdate);
// Add bulk assign if needed

export default router;
