import { prisma } from '../../server';
import { RazorpayService } from '../../services/payment/razorpay.service';
export class BillingService {
    static async getSubscription(organizationId) {
        return prisma.subscription.findFirst({
            where: { organizationId },
            include: { invoices: true },
        });
    }
    static async createSubscription(organizationId, planId, customerId) {
        // Basic abstraction. In reality, Razorpay flow is more complex.
        const rpSub = await RazorpayService.createSubscription(planId, customerId, 12);
        return prisma.subscription.create({
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
        const sub = await prisma.subscription.findFirst({
            where: { id: subscriptionId, organizationId },
        });
        if (!sub || !sub.razorpaySubId)
            throw new Error('Subscription not found');
        await RazorpayService.cancelSubscription(sub.razorpaySubId);
        return prisma.subscription.update({
            where: { id: subscriptionId },
            data: { status: 'Cancelled' },
        });
    }
}
//# sourceMappingURL=billing.service.js.map