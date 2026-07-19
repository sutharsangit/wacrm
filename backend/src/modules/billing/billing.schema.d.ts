import { z } from 'zod';
export declare const createSubscriptionSchema: z.ZodObject<{
    body: z.ZodObject<{
        planId: z.ZodString;
        customerId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=billing.schema.d.ts.map