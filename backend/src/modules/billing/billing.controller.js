import { Response, NextFunction } from 'express';
import { BillingService } from './billing.service';
import { AuthRequest } from '../../middleware/auth.middleware';
export class BillingController {
    static async get(req, res, next) {
        try {
            const sub = await BillingService.getSubscription(req.user.organizationId);
            res.status(200).json({ success: true, data: sub });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const { planId, customerId } = req.body;
            const sub = await BillingService.createSubscription(req.user.organizationId, planId, customerId);
            res.status(201).json({ success: true, message: 'Subscription created', data: sub });
        }
        catch (error) {
            next(error);
        }
    }
    static async cancel(req, res, next) {
        try {
            const sub = await BillingService.cancelSubscription(req.user.organizationId, req.params.id);
            res.status(200).json({ success: true, message: 'Subscription cancelled', data: sub });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=billing.controller.js.map