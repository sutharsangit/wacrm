export declare class BillingService {
    static getSubscription(organizationId: string): Promise<{
        invoices: {
            id: string;
            subscriptionId: string;
            amount: number;
            status: string;
            issuedAt: Date;
            paidAt: Date | null;
            razorpayInvId: string | null;
        }[];
    } & {
        id: string;
        organizationId: string;
        plan: string;
        status: string;
        billingCycle: string;
        renewalDate: Date;
        razorpaySubId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static createSubscription(organizationId: string, planId: string, customerId: string): Promise<{
        id: string;
        organizationId: string;
        plan: string;
        status: string;
        billingCycle: string;
        renewalDate: Date;
        razorpaySubId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static cancelSubscription(organizationId: string, subscriptionId: string): Promise<{
        id: string;
        organizationId: string;
        plan: string;
        status: string;
        billingCycle: string;
        renewalDate: Date;
        razorpaySubId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
