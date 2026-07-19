export declare class AuthService {
    static registerBusiness(data: any): Promise<{
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
        };
        organization: any;
        tokens: any;
    }>;
    static login(data: any): Promise<{
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
        };
        organization: any;
        tokens: any;
    }>;
    static refreshToken(refreshToken: string): Promise<any>;
}
//# sourceMappingURL=auth.service.d.ts.map