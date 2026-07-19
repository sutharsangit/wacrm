"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const users_schema_1 = require("./users.schema");
const router = (0, express_1.Router)();
// Protect all routes
router.use(auth_middleware_1.authenticate);
router.get('/', users_controller_1.UsersController.list);
router.post('/invite', (0, auth_middleware_1.authorize)(['users:write']), (0, validate_middleware_1.validate)(users_schema_1.inviteUserSchema), users_controller_1.UsersController.invite);
router.put('/:id', (0, auth_middleware_1.authorize)(['users:write']), (0, validate_middleware_1.validate)(users_schema_1.updateUserSchema), users_controller_1.UsersController.update);
router.delete('/:id', (0, auth_middleware_1.authorize)(['users:delete']), users_controller_1.UsersController.deactivate);
exports.default = router;
//# sourceMappingURL=users.routes.js.map