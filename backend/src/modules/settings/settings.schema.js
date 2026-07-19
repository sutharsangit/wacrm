import { z } from 'zod';
export const updateSettingSchema = z.object({
    body: z.object({
        key: z.string().min(1, 'Setting key is required'),
        value: z.any(),
    }),
});
//# sourceMappingURL=settings.schema.js.map