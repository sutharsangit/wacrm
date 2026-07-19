"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizationSchema = void 0;
const zod_1 = require("zod");
exports.updateOrganizationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        industry: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        timezone: zod_1.z.string().optional(),
        logoUrl: zod_1.z.string().url().optional(),
    }),
});
//# sourceMappingURL=organizations.schema.js.map