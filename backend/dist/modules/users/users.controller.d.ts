import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
export declare class UsersController {
    static list(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static invite(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static update(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static deactivate(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
