"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crm_controller_1 = require("./crm.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const crm_schema_1 = require("./crm.schema");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
// Notes
router.post('/notes', (0, auth_middleware_1.authorize)(['crm:write']), (0, validate_middleware_1.validate)(crm_schema_1.createNoteSchema), crm_controller_1.CrmController.addNote);
// Call Logs
router.post('/calls', (0, auth_middleware_1.authorize)(['crm:write']), (0, validate_middleware_1.validate)(crm_schema_1.createCallLogSchema), crm_controller_1.CrmController.addCallLog);
// Follow-ups
router.post('/follow-ups', (0, auth_middleware_1.authorize)(['crm:write']), (0, validate_middleware_1.validate)(crm_schema_1.createFollowUpSchema), crm_controller_1.CrmController.createFollowUp);
router.put('/follow-ups/:id', (0, auth_middleware_1.authorize)(['crm:write']), (0, validate_middleware_1.validate)(crm_schema_1.updateFollowUpSchema), crm_controller_1.CrmController.updateFollowUp);
router.get('/follow-ups', (0, auth_middleware_1.authorize)(['crm:read']), crm_controller_1.CrmController.listFollowUps);
exports.default = router;
//# sourceMappingURL=crm.routes.js.map