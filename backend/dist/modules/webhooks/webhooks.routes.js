"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhooks_controller_1 = require("./webhooks.controller");
const router = (0, express_1.Router)();
// Webhooks don't use standard JWT auth because they are called by external services (Meta/Google).
// Normally we'd use a secret token verification here.
router.get('/meta/:orgId', webhooks_controller_1.WebhooksController.metaWebhook);
router.post('/meta/:orgId', webhooks_controller_1.WebhooksController.metaWebhook);
router.post('/google/:orgId', webhooks_controller_1.WebhooksController.googleWebhook);
exports.default = router;
//# sourceMappingURL=webhooks.routes.js.map