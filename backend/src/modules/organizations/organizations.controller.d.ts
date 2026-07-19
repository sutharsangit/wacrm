import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
export declare class OrganizationsController {
    static get(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    static update(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=organizations.controller.d.ts.map