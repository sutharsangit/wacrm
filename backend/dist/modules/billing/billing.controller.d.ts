import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
export declare class BillingController {
    static get(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static create(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static cancel(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
