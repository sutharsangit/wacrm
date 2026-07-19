import { z } from 'zod';
export declare const createLeadSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        company: z.ZodOptional<z.ZodString>;
        leadSource: z.ZodString;
        campaign: z.ZodOptional<z.ZodString>;
        priority: z.ZodOptional<z.ZodEnum<{
            High: "High";
            Low: "Low";
            Medium: "Medium";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateLeadSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        company: z.ZodOptional<z.ZodString>;
        currentStatus: z.ZodOptional<z.ZodString>;
        qualificationStatus: z.ZodOptional<z.ZodString>;
        priority: z.ZodOptional<z.ZodEnum<{
            High: "High";
            Low: "Low";
            Medium: "Medium";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const bulkUpdateSchema: z.ZodObject<{
    body: z.ZodObject<{
        leadIds: z.ZodArray<z.ZodString>;
        data: z.ZodRecord<z.ZodAny, z.core.SomeType>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const assignLeadSchema: z.ZodObject<{
    body: z.ZodObject<{
        userId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const bulkAssignSchema: z.ZodObject<{
    body: z.ZodObject<{
        leadIds: z.ZodArray<z.ZodString>;
        userId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=leads.schema.d.ts.map