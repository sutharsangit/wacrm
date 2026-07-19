export declare class AuthService {
    static registerBusiness(data: any): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        organization: {
            id: string;
            name: string;
            industry: string | null;
            address: string | null;
            timezone: string;
            logoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    static login(data: any): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: string;
        };
        organization: {
            id: string;
            name: string;
            industry: string | null;
            address: string | null;
            timezone: string;
            logoUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    static refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
