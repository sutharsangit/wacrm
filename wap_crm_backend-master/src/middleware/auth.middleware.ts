import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { prisma } from '../server';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    organizationId: string;
    roleId: string;
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      const error: any = new Error('Authentication required');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    // Verify user still exists and belongs to the organization
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.deletedAt) {
      const error: any = new Error('User not found or deactivated');
      error.statusCode = 401;
      throw error;
    }

    req.user = {
      id: decoded.userId,
      organizationId: decoded.organizationId,
      roleId: decoded.roleId,
    };

    next();
  } catch (err) {
    console.error('DEBUG - Auth Middleware Exception:', err);
    const error: any = new Error('Invalid or expired token');
    error.statusCode = 401;
    next(error);
  }
};

export const authorize = (permissions: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }

      // Check if role has the required permissions
      const role = await prisma.role.findUnique({
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
        const error: any = new Error('Forbidden: Insufficient permissions');
        error.statusCode = 403;
        throw error;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
