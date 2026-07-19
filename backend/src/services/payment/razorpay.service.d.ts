import Razorpay from 'razorpay';
export declare class RazorpayService {
    private static instance;
    static getInstance(): Razorpay;
    static createSubscription(planId: string, customerId: string, totalCount: number): Promise<import("razorpay/dist/types/subscriptions.js").Subscriptions.RazorpaySubscription>;
    static cancelSubscription(subscriptionId: string): Promise<import("razorpay/dist/types/subscriptions.js").Subscriptions.RazorpaySubscription>;
    static verifyWebhookSignature(payload: string, signature: string, secret: string): boolean;
}
//# sourceMappingURL=razorpay.service.d.ts.map