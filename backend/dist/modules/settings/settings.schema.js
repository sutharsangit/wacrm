"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettingSchema = void 0;
const zod_1 = require("zod");
exports.updateSettingSchema = zod_1.z.object({
    body: zod_1.z.object({
        key: zod_1.z.string().min(1, 'Setting key is required'),
        value: zod_1.z.any(),
    }),
});
//# sourceMappingURL=settings.schema.js.map