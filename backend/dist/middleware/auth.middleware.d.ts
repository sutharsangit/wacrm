import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: {
        id: string;
        organizationId: string;
        roleId: string;
    };
}
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const authorize: (permissions: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
