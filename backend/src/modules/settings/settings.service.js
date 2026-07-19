import { prisma } from '../../server';
export class SettingsService {
    static async getSettings(organizationId) {
        return prisma.setting.findMany({
            where: { organizationId },
        });
    }
    static async updateSetting(organizationId, key, value) {
        const existing = await prisma.setting.findFirst({
            where: { organizationId, key },
        });
        if (existing) {
            return prisma.setting.update({
                where: { id: existing.id },
                data: { value },
            });
        }
        return prisma.setting.create({
            data: {
                organizationId,
                key,
                value,
            },
        });
    }
}
//# sourceMappingURL=settings.service.js.map