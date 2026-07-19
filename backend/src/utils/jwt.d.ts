export interface JwtPayload {
    userId: string;
    organizationId: string;
    roleId: string;
}
export declare const generateTokens: (payload: JwtPayload) => {
    accessToken: never;
    refreshToken: never;
};
export declare const verifyAccessToken: (token: string) => JwtPayload;
export declare const verifyRefreshToken: (token: string) => JwtPayload;
//# sourceMappingURL=jwt.d.ts.map