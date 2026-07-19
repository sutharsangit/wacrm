import { z } from 'zod';
export declare const inviteUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodOptional<z.ZodString>;
        roleId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        roleId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const assignRoleSchema: z.ZodObject<{
    body: z.ZodObject<{
        roleId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=users.schema.d.ts.map