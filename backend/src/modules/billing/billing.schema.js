import { z } from 'zod';
export const createSubscriptionSchema = z.object({
    body: z.object({
        planId: z.string().min(1, 'Plan ID is required'),
        customerId: z.string().min(1, 'Customer ID is required'),
    }),
});
//# sourceMappingURL=billing.schema.js.map