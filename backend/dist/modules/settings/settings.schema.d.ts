import { z } from 'zod';
export declare const updateSettingSchema: z.ZodObject<{
    body: z.ZodObject<{
        key: z.ZodString;
        value: z.ZodAny;
    }, z.core.$strip>;
}, z.core.$strip>;
