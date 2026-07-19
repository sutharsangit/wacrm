"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayService = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
class RazorpayService {
    static instance = null;
    static getInstance() {
        if (!this.instance) {
            if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
                throw new Error('Razorpay keys not configured');
            }
            this.instance = new razorpay_1.default({
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
        const expectedSignature = crypto_1.default
            .createHmac('sha256', secret)
            .update(payload)
            .digest('hex');
        return expectedSignature === signature;
    }
}
exports.RazorpayService = RazorpayService;
//# sourceMappingURL=razorpay.service.js.map