import { Response, NextFunction } from 'express';
import { SettingsService } from './settings.service';
import { AuthRequest } from '../../middleware/auth.middleware';
export class SettingsController {
    static async get(req, res, next) {
        try {
            const settings = await SettingsService.getSettings(req.user.organizationId);
            res.status(200).json({ success: true, data: settings });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const { key, value } = req.body;
            const setting = await SettingsService.updateSetting(req.user.organizationId, key, value);
            res.status(200).json({ success: true, message: 'Setting updated', data: setting });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=settings.controller.js.map