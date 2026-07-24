import { z } from 'zod';

export const updateOrganizationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    industry: z.string().optional(),
    address: z.string().optional(),
    timezone: z.string().optional(),
    logoUrl: z.string().url().optional(),
  }),
});
