import { prisma } from '../../server';

export class SettingsService {
  static async getSettings(organizationId: string) {
    return prisma.setting.findMany({
      where: { organizationId },
    });
  }

  static async updateSetting(organizationId: string, key: string, value: any) {
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
