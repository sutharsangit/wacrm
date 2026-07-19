"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const settings_service_1 = require("./settings.service");
class SettingsController {
    static async get(req, res, next) {
        try {
            const settings = await settings_service_1.SettingsService.getSettings(req.user.organizationId);
            res.status(200).json({ success: true, data: settings });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const { key, value } = req.body;
            const setting = await settings_service_1.SettingsService.updateSetting(req.user.organizationId, key, value);
            res.status(200).json({ success: true, message: 'Setting updated', data: setting });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map