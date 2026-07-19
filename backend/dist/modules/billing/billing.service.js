"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const server_1 = require("../../server");
const razorpay_service_1 = require("../../services/payment/razorpay.service");
class BillingService {
    static async getSubscription(organizationId) {
        return server_1.prisma.subscription.findFirst({
            where: { organizationId },
            include: { invoices: true },
        });
    }
    static async createSubscription(organizationId, planId, customerId) {
        // Basic abstraction. In reality, Razorpay flow is more complex.
        const rpSub = await razorpay_service_1.RazorpayService.createSubscription(planId, customerId, 12);
        return server_1.prisma.subscription.create({
            data: {
                organizationId,
                plan: 'Professional', // map planId to name
                status: 'Active',
                billingCycle: 'Monthly',
                renewalDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                razorpaySubId: rpSub.id,
            },
        });
    }
    static async cancelSubscription(organizationId, subscriptionId) {
        const sub = await server_1.prisma.subscription.findFirst({
            where: { id: subscriptionId, organizationId },
        });
        if (!sub || !sub.razorpaySubId)
            throw new Error('Subscription not found');
        await razorpay_service_1.RazorpayService.cancelSubscription(sub.razorpaySubId);
        return server_1.prisma.subscription.update({
            where: { id: subscriptionId },
            data: { status: 'Cancelled' },
        });
    }
}
exports.BillingService = BillingService;
//# sourceMappingURL=billing.service.js.map