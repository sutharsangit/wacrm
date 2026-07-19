"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsController = void 0;
const leads_service_1 = require("./leads.service");
class LeadsController {
    static async create(req, res, next) {
        try {
            const lead = await leads_service_1.LeadsService.createLead(req.user.organizationId, req.user.id, req.body);
            res.status(201).json({ success: true, message: 'Lead created successfully', data: lead });
        }
        catch (error) {
            next(error);
        }
    }
    static async list(req, res, next) {
        try {
            const result = await leads_service_1.LeadsService.listLeads(req.user.organizationId, req.query);
            res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const lead = await leads_service_1.LeadsService.getLeadById(req.user.organizationId, req.params.id);
            if (!lead) {
                return res.status(404).json({ success: false, message: 'Lead not found' });
            }
            res.status(200).json({ success: true, data: lead });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const lead = await leads_service_1.LeadsService.updateLead(req.user.organizationId, req.params.id, req.body, req.user.id);
            res.status(200).json({ success: true, message: 'Lead updated successfully', data: lead });
        }
        catch (error) {
            next(error);
        }
    }
    static async assign(req, res, next) {
        try {
            const assignment = await leads_service_1.LeadsService.assignLead(req.user.organizationId, req.params.id, req.body.userId);
            res.status(200).json({ success: true, message: 'Lead assigned successfully', data: assignment });
        }
        catch (error) {
            next(error);
        }
    }
    static async bulkUpdate(req, res, next) {
        try {
            const { leadIds, data } = req.body;
            const result = await leads_service_1.LeadsService.bulkUpdate(req.user.organizationId, leadIds, data);
            res.status(200).json({ success: true, message: 'Leads updated successfully', data: result });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            await leads_service_1.LeadsService.deleteLead(req.user.organizationId, req.params.id);
            res.status(200).json({ success: true, message: 'Lead deleted successfully' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.LeadsController = LeadsController;
//# sourceMappingURL=leads.controller.js.map