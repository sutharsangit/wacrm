import { z } from 'zod';
export declare const updateOrganizationSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        industry: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        timezone: z.ZodOptional<z.ZodString>;
        logoUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
