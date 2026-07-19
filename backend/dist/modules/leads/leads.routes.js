"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leads_controller_1 = require("./leads.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const leads_schema_1 = require("./leads.schema");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.post('/', (0, auth_middleware_1.authorize)(['leads:write']), (0, validate_middleware_1.validate)(leads_schema_1.createLeadSchema), leads_controller_1.LeadsController.create);
router.get('/', (0, auth_middleware_1.authorize)(['leads:read']), leads_controller_1.LeadsController.list);
router.get('/:id', (0, auth_middleware_1.authorize)(['leads:read']), leads_controller_1.LeadsController.getById);
router.put('/:id', (0, auth_middleware_1.authorize)(['leads:write']), (0, validate_middleware_1.validate)(leads_schema_1.updateLeadSchema), leads_controller_1.LeadsController.update);
router.delete('/:id', (0, auth_middleware_1.authorize)(['leads:delete']), leads_controller_1.LeadsController.delete);
// Assignments
router.post('/:id/assign', (0, auth_middleware_1.authorize)(['leads:assign']), (0, validate_middleware_1.validate)(leads_schema_1.assignLeadSchema), leads_controller_1.LeadsController.assign);
// Bulk Operations
router.post('/bulk-update', (0, auth_middleware_1.authorize)(['leads:write']), (0, validate_middleware_1.validate)(leads_schema_1.bulkUpdateSchema), leads_controller_1.LeadsController.bulkUpdate);
// Add bulk assign if needed
exports.default = router;
//# sourceMappingURL=leads.routes.js.map