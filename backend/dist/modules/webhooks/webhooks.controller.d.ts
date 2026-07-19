import { Request, Response, NextFunction } from 'express';
export declare class WebhooksController {
    static metaWebhook(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    static googleWebhook(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
