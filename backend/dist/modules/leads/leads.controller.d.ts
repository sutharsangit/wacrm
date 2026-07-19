import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
export declare class LeadsController {
    static create(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static list(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getById(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static update(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static assign(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static bulkUpdate(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
