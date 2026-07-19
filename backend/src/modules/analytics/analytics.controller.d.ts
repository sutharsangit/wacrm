import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
export declare class AnalyticsController {
    static getDashboard(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getSources(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static getSalesPerformance(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=analytics.controller.d.ts.map