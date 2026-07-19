export interface JwtPayload {
    userId: string;
    organizationId: string;
    roleId: string;
}
export declare const generateTokens: (payload: JwtPayload) => {
    accessToken: string;
    refreshToken: string;
};
export declare const verifyAccessToken: (token: string) => JwtPayload;
export declare const verifyRefreshToken: (token: string) => JwtPayload;
