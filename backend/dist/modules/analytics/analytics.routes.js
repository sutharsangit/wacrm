"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("./analytics.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/dashboard', (0, auth_middleware_1.authorize)(['analytics:read']), analytics_controller_1.AnalyticsController.getDashboard);
router.get('/sources', (0, auth_middleware_1.authorize)(['analytics:read']), analytics_controller_1.AnalyticsController.getSources);
router.get('/sales-performance', (0, auth_middleware_1.authorize)(['analytics:read']), analytics_controller_1.AnalyticsController.getSalesPerformance);
exports.default = router;
//# sourceMappingURL=analytics.routes.js.map