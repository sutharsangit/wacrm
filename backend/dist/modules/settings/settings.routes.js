"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("./settings.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const settings_schema_1 = require("./settings.schema");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', (0, auth_middleware_1.authorize)(['settings:read']), settings_controller_1.SettingsController.get);
router.post('/', (0, auth_middleware_1.authorize)(['settings:write']), (0, validate_middleware_1.validate)(settings_schema_1.updateSettingSchema), settings_controller_1.SettingsController.update);
exports.default = router;
//# sourceMappingURL=settings.routes.js.map