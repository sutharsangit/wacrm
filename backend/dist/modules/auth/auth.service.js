"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const server_1 = require("../../server");
const jwt_1 = require("../../utils/jwt");
class AuthService {
    static async registerBusiness(data) {
        const { companyName, industry, firstName, lastName, email, password } = data;
        const existingUser = await server_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            const error = new Error('Email already in use');
            error.statusCode = 409;
            throw error;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Transaction to create Organization, Role, and User
        const result = await server_1.prisma.$transaction(async (tx) => {
            const organization = await tx.organization.create({
                data: {
                    name: companyName,
                    industry,
                },
            });
            const ownerRole = await tx.role.create({
                data: {
                    name: 'Owner',
                    organizationId: organization.id,
                },
            });
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash: hashedPassword,
                    firstName,
                    lastName,
                    organizationId: organization.id,
                    roleId: ownerRole.id,
                },
            });
            return { organization, user, ownerRole };
        });
        const tokens = (0, jwt_1.generateTokens)({
            userId: result.user.id,
            organizationId: result.organization.id,
            roleId: result.ownerRole.id,
        });
        return {
            user: {
                id: result.user.id,
                email: result.user.email,
                firstName: result.user.firstName,
                lastName: result.user.lastName,
            },
            organization: result.organization,
            tokens,
        };
    }
    static async login(data) {
        const { email, password } = data;
        const user = await server_1.prisma.user.findUnique({
            where: { email },
            include: { organization: true, role: true },
        });
        if (!user || user.deletedAt) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        const tokens = (0, jwt_1.generateTokens)({
            userId: user.id,
            organizationId: user.organizationId,
            roleId: user.roleId,
        });
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role.name,
            },
            organization: user.organization,
            tokens,
        };
    }
    static async refreshToken(refreshToken) {
        try {
            const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
            const tokens = (0, jwt_1.generateTokens)({
                userId: decoded.userId,
                organizationId: decoded.organizationId,
                roleId: decoded.roleId,
            });
            return tokens;
        }
        catch (err) {
            const error = new Error('Invalid or expired refresh token');
            error.statusCode = 401;
            throw error;
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map