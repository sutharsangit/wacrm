import { z } from 'zod';

export const createNoteSchema = z.object({
  body: z.object({
    leadId: z.string().uuid(),
    content: z.string().min(1, 'Note content cannot be empty'),
  }),
});

export const createCallLogSchema = z.object({
  body: z.object({
    leadId: z.string().uuid(),
    callDate: z.string().datetime(),
    duration: z.number().int().optional(),
    outcome: z.string(),
    remarks: z.string().optional(),
  }),
});

export const createFollowUpSchema = z.object({
  body: z.object({
    leadId: z.string().uuid(),
    dueDate: z.string().datetime(),
    taskType: z.string(),
    notes: z.string().optional(),
  }),
});

export const updateFollowUpSchema = z.object({
  body: z.object({
    status: z.string(), // Pending, Completed, Overdue
    notes: z.string().optional(),
  }),
});
