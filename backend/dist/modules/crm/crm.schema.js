"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFollowUpSchema = exports.createFollowUpSchema = exports.createCallLogSchema = exports.createNoteSchema = void 0;
const zod_1 = require("zod");
exports.createNoteSchema = zod_1.z.object({
    body: zod_1.z.object({
        leadId: zod_1.z.string().uuid(),
        content: zod_1.z.string().min(1, 'Note content cannot be empty'),
    }),
});
exports.createCallLogSchema = zod_1.z.object({
    body: zod_1.z.object({
        leadId: zod_1.z.string().uuid(),
        callDate: zod_1.z.string().datetime(),
        duration: zod_1.z.number().int().optional(),
        outcome: zod_1.z.string(),
        remarks: zod_1.z.string().optional(),
    }),
});
exports.createFollowUpSchema = zod_1.z.object({
    body: zod_1.z.object({
        leadId: zod_1.z.string().uuid(),
        dueDate: zod_1.z.string().datetime(),
        taskType: zod_1.z.string(),
        notes: zod_1.z.string().optional(),
    }),
});
exports.updateFollowUpSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.string(), // Pending, Completed, Overdue
        notes: zod_1.z.string().optional(),
    }),
});
//# sourceMappingURL=crm.schema.js.map