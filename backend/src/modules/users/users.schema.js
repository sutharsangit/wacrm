import { z } from 'zod';
export const inviteUserSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        firstName: z.string().min(2),
        lastName: z.string().optional(),
        roleId: z.string().uuid(),
        // Password will be generated or set via an invite link. We'll set a random one for now.
    }),
});
export const updateUserSchema = z.object({
    body: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        roleId: z.string().uuid().optional(),
    }),
});
export const assignRoleSchema = z.object({
    body: z.object({
        roleId: z.string().uuid(),
    }),
});
//# sourceMappingURL=users.schema.js.map