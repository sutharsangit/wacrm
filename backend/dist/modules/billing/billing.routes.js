"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const billing_controller_1 = require("./billing.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const billing_schema_1 = require("./billing.schema");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', (0, auth_middleware_1.authorize)(['billing:read']), billing_controller_1.BillingController.get);
router.post('/', (0, auth_middleware_1.authorize)(['billing:write']), (0, validate_middleware_1.validate)(billing_schema_1.createSubscriptionSchema), billing_controller_1.BillingController.create);
router.delete('/:id', (0, auth_middleware_1.authorize)(['billing:write']), billing_controller_1.BillingController.cancel);
exports.default = router;
//# sourceMappingURL=billing.routes.js.map