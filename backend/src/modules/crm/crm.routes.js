import { Router } from 'express';
import { CrmController } from './crm.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { createNoteSchema, createCallLogSchema, createFollowUpSchema, updateFollowUpSchema, } from './crm.schema';
const router = Router();
router.use(authenticate);
// Notes
router.post('/notes', authorize(['crm:write']), validate(createNoteSchema), CrmController.addNote);
// Call Logs
router.post('/calls', authorize(['crm:write']), validate(createCallLogSchema), CrmController.addCallLog);
// Follow-ups
router.post('/follow-ups', authorize(['crm:write']), validate(createFollowUpSchema), CrmController.createFollowUp);
router.put('/follow-ups/:id', authorize(['crm:write']), validate(updateFollowUpSchema), CrmController.updateFollowUp);
router.get('/follow-ups', authorize(['crm:read']), CrmController.listFollowUps);
export default router;
//# sourceMappingURL=crm.routes.js.map