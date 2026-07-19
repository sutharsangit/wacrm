import { Request, Response, NextFunction } from 'express';
export declare class WebhooksController {
    static metaWebhook(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static googleWebhook(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=webhooks.controller.d.ts.map