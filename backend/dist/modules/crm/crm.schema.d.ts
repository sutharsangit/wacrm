import { z } from 'zod';
export declare const createNoteSchema: z.ZodObject<{
    body: z.ZodObject<{
        leadId: z.ZodString;
        content: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const createCallLogSchema: z.ZodObject<{
    body: z.ZodObject<{
        leadId: z.ZodString;
        callDate: z.ZodString;
        duration: z.ZodOptional<z.ZodNumber>;
        outcome: z.ZodString;
        remarks: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const createFollowUpSchema: z.ZodObject<{
    body: z.ZodObject<{
        leadId: z.ZodString;
        dueDate: z.ZodString;
        taskType: z.ZodString;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateFollowUpSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodString;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
