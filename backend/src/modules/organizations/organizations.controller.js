import { Response, NextFunction } from 'express';
import { OrganizationsService } from './organizations.service';
import { AuthRequest } from '../../middleware/auth.middleware';
export class OrganizationsController {
    static async get(req, res, next) {
        try {
            const org = await OrganizationsService.getOrganization(req.user.organizationId);
            res.status(200).json({ success: true, data: org });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const org = await OrganizationsService.updateOrganization(req.user.organizationId, req.body);
            res.status(200).json({ success: true, message: 'Organization updated successfully', data: org });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=organizations.controller.js.map