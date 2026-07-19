import { Router } from 'express';
import { LeadsController } from './leads.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { createLeadSchema, updateLeadSchema, bulkUpdateSchema, assignLeadSchema, bulkAssignSchema, } from './leads.schema';
const router = Router();
router.use(authenticate);
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
//# sourceMappingURL=leads.routes.js.map