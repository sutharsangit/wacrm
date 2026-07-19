"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsController = void 0;
const organizations_service_1 = require("./organizations.service");
class OrganizationsController {
    static async get(req, res, next) {
        try {
            const org = await organizations_service_1.OrganizationsService.getOrganization(req.user.organizationId);
            res.status(200).json({ success: true, data: org });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const org = await organizations_service_1.OrganizationsService.updateOrganization(req.user.organizationId, req.body);
            res.status(200).json({ success: true, message: 'Organization updated successfully', data: org });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.OrganizationsController = OrganizationsController;
//# sourceMappingURL=organizations.controller.js.map