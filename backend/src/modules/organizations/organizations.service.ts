import { prisma } from '../../server';

export class OrganizationsService {
  static async getOrganization(id: string) {
    return prisma.organization.findUnique({
      where: { id },
      include: {
        settings: true,
        subscriptions: true,
      },
    });
  }

  static async updateOrganization(id: string, data: any) {
    return prisma.organization.update({
      where: { id },
      data,
    });
  }
}
