import { prisma } from '../../server';
import bcrypt from 'bcrypt';
export class UsersService {
    static async listUsers(organizationId) {
        return prisma.user.findMany({
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
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            const error = new Error('Email already registered');
            error.statusCode = 409;
            throw error;
        }
        // Generate random password for invitee
        const tempPassword = Math.random().toString(36).slice(-8);
        const passwordHash = await bcrypt.hash(tempPassword, 10);
        const user = await prisma.user.create({
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
        return prisma.user.update({
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
        return prisma.user.update({
            where: { id: userId, organizationId },
            data: { deletedAt: new Date() },
        });
    }
}
//# sourceMappingURL=users.service.js.map