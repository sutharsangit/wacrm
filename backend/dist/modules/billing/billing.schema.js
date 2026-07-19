"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionSchema = void 0;
const zod_1 = require("zod");
exports.createSubscriptionSchema = zod_1.z.object({
    body: zod_1.z.object({
        planId: zod_1.z.string().min(1, 'Plan ID is required'),
        customerId: zod_1.z.string().min(1, 'Customer ID is required'),
    }),
});
//# sourceMappingURL=billing.schema.js.map