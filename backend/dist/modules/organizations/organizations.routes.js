"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organizations_controller_1 = require("./organizations.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const organizations_schema_1 = require("./organizations.schema");
const router = (0, express_1.Router)();
// Protect all routes
router.use(auth_middleware_1.authenticate);
router.get('/', organizations_controller_1.OrganizationsController.get);
router.put('/', (0, auth_middleware_1.authorize)(['organization:write']), (0, validate_middleware_1.validate)(organizations_schema_1.updateOrganizationSchema), organizations_controller_1.OrganizationsController.update);
exports.default = router;
//# sourceMappingURL=organizations.routes.js.map