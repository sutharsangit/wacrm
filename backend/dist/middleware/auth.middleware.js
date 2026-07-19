"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const server_1 = require("../server");
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            const error = new Error('Authentication required');
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader.split(' ')[1];
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        // Verify user still exists and belongs to the organization
        const user = await server_1.prisma.user.findUnique({
            where: { id: decoded.userId },
        });
        if (!user || user.deletedAt) {
            const error = new Error('User not found or deactivated');
            error.statusCode = 401;
            throw error;
        }
        req.user = {
            id: decoded.userId,
            organizationId: decoded.organizationId,
            roleId: decoded.roleId,
        };
        next();
    }
    catch (err) {
        const error = new Error('Invalid or expired token');
        error.statusCode = 401;
        next(error);
    }
};
exports.authenticate = authenticate;
const authorize = (permissions) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                throw new Error('User not authenticated');
            }
            // Check if role has the required permissions
            const role = await server_1.prisma.role.findUnique({
                where: { id: req.user.roleId },
                include: { permissions: true },
            });
            if (!role) {
                throw new Error('Role not found');
            }
            // If Owner or Admin, they might have all permissions, but for RBAC we check explicit or implicit grants
            // Here we assume Owner has access to everything
            if (role.name === 'Owner' || role.name === 'Admin') {
                return next();
            }
            const userPermissions = role.permissions.map((p) => p.action);
            const hasPermission = permissions.every((p) => userPermissions.includes(p));
            if (!hasPermission) {
                const error = new Error('Forbidden: Insufficient permissions');
                error.statusCode = 403;
                throw error;
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map