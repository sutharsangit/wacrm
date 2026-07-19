import Razorpay from 'razorpay';
import crypto from 'crypto';
export class RazorpayService {
    static instance = null;
    static getInstance() {
        if (!this.instance) {
            if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
                throw new Error('Razorpay keys not configured');
            }
            this.instance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            });
        }
        return this.instance;
    }
    static async createSubscription(planId, customerId, totalCount) {
        const razorpay = this.getInstance();
        return razorpay.subscriptions.create({
            plan_id: planId,
            customer_notify: 1,
            total_count: totalCount,
        });
    }
    static async cancelSubscription(subscriptionId) {
        const razorpay = this.getInstance();
        return razorpay.subscriptions.cancel(subscriptionId);
    }
    static verifyWebhookSignature(payload, signature, secret) {
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(payload)
            .digest('hex');
        return expectedSignature === signature;
    }
}
//# sourceMappingURL=razorpay.service.js.map