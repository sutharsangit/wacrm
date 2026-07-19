import { Router } from 'express';
import { UsersController } from './users.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { inviteUserSchema, updateUserSchema } from './users.schema';
const router = Router();
// Protect all routes
router.use(authenticate);
router.get('/', UsersController.list);
router.post('/invite', authorize(['users:write']), validate(inviteUserSchema), UsersController.invite);
router.put('/:id', authorize(['users:write']), validate(updateUserSchema), UsersController.update);
router.delete('/:id', authorize(['users:delete']), UsersController.deactivate);
export default router;
//# sourceMappingURL=users.routes.js.map