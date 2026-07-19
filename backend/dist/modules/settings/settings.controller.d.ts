import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
export declare class SettingsController {
    static get(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static update(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
