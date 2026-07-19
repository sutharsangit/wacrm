"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkAssignSchema = exports.assignLeadSchema = exports.bulkUpdateSchema = exports.updateLeadSchema = exports.createLeadSchema = void 0;
const zod_1 = require("zod");
exports.createLeadSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional().or(zod_1.z.literal('')),
        company: zod_1.z.string().optional(),
        leadSource: zod_1.z.string(),
        campaign: zod_1.z.string().optional(),
        priority: zod_1.z.enum(['High', 'Medium', 'Low']).optional(),
    }),
});
exports.updateLeadSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional().or(zod_1.z.literal('')),
        company: zod_1.z.string().optional(),
        currentStatus: zod_1.z.string().optional(),
        qualificationStatus: zod_1.z.string().optional(),
        priority: zod_1.z.enum(['High', 'Medium', 'Low']).optional(),
    }),
});
exports.bulkUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        leadIds: zod_1.z.array(zod_1.z.string().uuid()),
        data: zod_1.z.record(zod_1.z.any()),
    }),
});
exports.assignLeadSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().uuid(),
    }),
});
exports.bulkAssignSchema = zod_1.z.object({
    body: zod_1.z.object({
        leadIds: zod_1.z.array(zod_1.z.string().uuid()),
        userId: zod_1.z.string().uuid(),
    }),
});
//# sourceMappingURL=leads.schema.js.map