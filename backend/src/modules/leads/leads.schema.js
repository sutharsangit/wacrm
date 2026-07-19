import { z } from 'zod';
export const createLeadSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        phone: z.string().optional(),
        email: z.string().email().optional().or(z.literal('')),
        company: z.string().optional(),
        leadSource: z.string(),
        campaign: z.string().optional(),
        priority: z.enum(['High', 'Medium', 'Low']).optional(),
    }),
});
export const updateLeadSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional().or(z.literal('')),
        company: z.string().optional(),
        currentStatus: z.string().optional(),
        qualificationStatus: z.string().optional(),
        priority: z.enum(['High', 'Medium', 'Low']).optional(),
    }),
});
export const bulkUpdateSchema = z.object({
    body: z.object({
        leadIds: z.array(z.string().uuid()),
        data: z.record(z.any()),
    }),
});
export const assignLeadSchema = z.object({
    body: z.object({
        userId: z.string().uuid(),
    }),
});
export const bulkAssignSchema = z.object({
    body: z.object({
        leadIds: z.array(z.string().uuid()),
        userId: z.string().uuid(),
    }),
});
//# sourceMappingURL=leads.schema.js.map