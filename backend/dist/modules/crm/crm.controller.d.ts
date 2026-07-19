import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
export declare class CrmController {
    static addNote(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static addCallLog(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static createFollowUp(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static updateFollowUp(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static listFollowUps(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
