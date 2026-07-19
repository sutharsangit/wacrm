"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const server_1 = require("../../server");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsersService {
    static async listUsers(organizationId) {
        return server_1.prisma.user.findMany({
            where: { organizationId, deletedAt: null },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: { select: { id: true, name: true } },
                createdAt: true,
            },
        });
    }
    static async inviteUser(organizationId, data) {
        const { email, firstName, lastName, roleId } = data;
        const existing = await server_1.prisma.user.findUnique({ where: { email } });
        if (existing) {
            const error = new Error('Email already registered');
            error.statusCode = 409;
            throw error;
        }
        // Generate random password for invitee
        const tempPassword = Math.random().toString(36).slice(-8);
        const passwordHash = await bcrypt_1.default.hash(tempPassword, 10);
        const user = await server_1.prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                passwordHash,
                organizationId,
                roleId,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
            },
        });
        // TODO: Send invite email with tempPassword or invite link
        return user;
    }
    static async updateUser(organizationId, userId, data) {
        return server_1.prisma.user.update({
            where: { id: userId, organizationId },
            data,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: { select: { name: true } },
            },
        });
    }
    static async deactivateUser(organizationId, userId) {
        return server_1.prisma.user.update({
            where: { id: userId, organizationId },
            data: { deletedAt: new Date() },
        });
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map