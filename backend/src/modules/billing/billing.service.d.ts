export declare class BillingService {
    static getSubscription(organizationId: string): Promise<any>;
    static createSubscription(organizationId: string, planId: string, customerId: string): Promise<any>;
    static cancelSubscription(organizationId: string, subscriptionId: string): Promise<any>;
}
//# sourceMappingURL=billing.service.d.ts.map