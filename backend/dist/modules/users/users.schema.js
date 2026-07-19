"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignRoleSchema = exports.updateUserSchema = exports.inviteUserSchema = void 0;
const zod_1 = require("zod");
exports.inviteUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
        firstName: zod_1.z.string().min(2),
        lastName: zod_1.z.string().optional(),
        roleId: zod_1.z.string().uuid(),
        // Password will be generated or set via an invite link. We'll set a random one for now.
    }),
});
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        roleId: zod_1.z.string().uuid().optional(),
    }),
});
exports.assignRoleSchema = zod_1.z.object({
    body: zod_1.z.object({
        roleId: zod_1.z.string().uuid(),
    }),
});
//# sourceMappingURL=users.schema.js.map