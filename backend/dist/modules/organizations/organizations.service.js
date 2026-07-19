"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsService = void 0;
const server_1 = require("../../server");
class OrganizationsService {
    static async getOrganization(id) {
        return server_1.prisma.organization.findUnique({
            where: { id },
            include: {
                settings: true,
                subscriptions: true,
            },
        });
    }
    static async updateOrganization(id, data) {
        return server_1.prisma.organization.update({
            where: { id },
            data,
        });
    }
}
exports.OrganizationsService = OrganizationsService;
//# sourceMappingURL=organizations.service.js.map