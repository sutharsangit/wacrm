"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const server_1 = require("../../server");
class SettingsService {
    static async getSettings(organizationId) {
        return server_1.prisma.setting.findMany({
            where: { organizationId },
        });
    }
    static async updateSetting(organizationId, key, value) {
        const existing = await server_1.prisma.setting.findFirst({
            where: { organizationId, key },
        });
        if (existing) {
            return server_1.prisma.setting.update({
                where: { id: existing.id },
                data: { value },
            });
        }
        return server_1.prisma.setting.create({
            data: {
                organizationId,
                key,
                value,
            },
        });
    }
}
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map