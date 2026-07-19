export declare class UsersService {
    static listUsers(organizationId: string): Promise<{
        createdAt: Date;
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        role: {
            id: string;
            name: string;
        };
    }[]>;
    static inviteUser(organizationId: string, data: any): Promise<{
        email: string;
        firstName: string;
        id: string;
    }>;
    static updateUser(organizationId: string, userId: string, data: any): Promise<{
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        role: {
            name: string;
        };
    }>;
    static deactivateUser(organizationId: string, userId: string): Promise<{
        id: string;
        organizationId: string;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string | null;
        roleId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
