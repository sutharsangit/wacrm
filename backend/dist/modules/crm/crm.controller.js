"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmController = void 0;
const crm_service_1 = require("./crm.service");
class CrmController {
    static async addNote(req, res, next) {
        try {
            const note = await crm_service_1.CrmService.addNote(req.user.organizationId, req.user.id, req.body);
            res.status(201).json({ success: true, message: 'Note added successfully', data: note });
        }
        catch (error) {
            next(error);
        }
    }
    static async addCallLog(req, res, next) {
        try {
            const callLog = await crm_service_1.CrmService.addCallLog(req.user.organizationId, req.user.id, req.body);
            res.status(201).json({ success: true, message: 'Call logged successfully', data: callLog });
        }
        catch (error) {
            next(error);
        }
    }
    static async createFollowUp(req, res, next) {
        try {
            const followUp = await crm_service_1.CrmService.createFollowUp(req.user.organizationId, req.user.id, req.body);
            res.status(201).json({ success: true, message: 'Follow-up created successfully', data: followUp });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateFollowUp(req, res, next) {
        try {
            const followUp = await crm_service_1.CrmService.updateFollowUp(req.user.organizationId, req.params.id, req.body);
            res.status(200).json({ success: true, message: 'Follow-up updated successfully', data: followUp });
        }
        catch (error) {
            next(error);
        }
    }
    static async listFollowUps(req, res, next) {
        try {
            // By default list user's followups. If they have permission, they could list all for the org.
            const userId = req.query.all ? undefined : req.user.id;
            const followUps = await crm_service_1.CrmService.listFollowUps(req.user.organizationId, userId);
            res.status(200).json({ success: true, data: followUps });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CrmController = CrmController;
//# sourceMappingURL=crm.controller.js.map