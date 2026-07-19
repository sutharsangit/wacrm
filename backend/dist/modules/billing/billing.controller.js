"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingController = void 0;
const billing_service_1 = require("./billing.service");
class BillingController {
    static async get(req, res, next) {
        try {
            const sub = await billing_service_1.BillingService.getSubscription(req.user.organizationId);
            res.status(200).json({ success: true, data: sub });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const { planId, customerId } = req.body;
            const sub = await billing_service_1.BillingService.createSubscription(req.user.organizationId, planId, customerId);
            res.status(201).json({ success: true, message: 'Subscription created', data: sub });
        }
        catch (error) {
            next(error);
        }
    }
    static async cancel(req, res, next) {
        try {
            const sub = await billing_service_1.BillingService.cancelSubscription(req.user.organizationId, req.params.id);
            res.status(200).json({ success: true, message: 'Subscription cancelled', data: sub });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.BillingController = BillingController;
//# sourceMappingURL=billing.controller.js.map