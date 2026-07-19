import bcrypt from 'bcrypt';
import { prisma } from '../../server';
import { generateTokens, verifyRefreshToken } from '../../utils/jwt';

export class AuthService {
  static async registerBusiness(data: any) {
    const { companyName, industry, firstName, lastName, email, password } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      const error: any = new Error('Email already in use');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Transaction to create Organization, Role, and User
    const result = await prisma.$transaction(async (tx) => {
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

    const tokens = generateTokens({
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

  static async login(data: any) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { organization: true, role: true },
    });

    if (!user || user.deletedAt) {
      const error: any = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      const error: any = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const tokens = generateTokens({
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

  static async refreshToken(refreshToken: string) {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const tokens = generateTokens({
        userId: decoded.userId,
        organizationId: decoded.organizationId,
        roleId: decoded.roleId,
      });
      return tokens;
    } catch (err) {
      const error: any = new Error('Invalid or expired refresh token');
      error.statusCode = 401;
      throw error;
    }
  }
}
