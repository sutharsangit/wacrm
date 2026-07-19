import { prisma } from '../../server';
export class OrganizationsService {
    static async getOrganization(id) {
        return prisma.organization.findUnique({
            where: { id },
            include: {
                settings: true,
                subscriptions: true,
            },
        });
    }
    static async updateOrganization(id, data) {
        return prisma.organization.update({
            where: { id },
            data,
        });
    }
}
//# sourceMappingURL=organizations.service.js.map