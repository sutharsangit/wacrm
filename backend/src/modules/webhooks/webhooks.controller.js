import { Request, Response, NextFunction } from 'express';
import { WebhooksService } from './webhooks.service';
import logger from '../../utils/logger';
export class WebhooksController {
    static async metaWebhook(req, res, next) {
        try {
            const organizationId = req.params.orgId; // Passed in URL
            // Meta webhook verification
            if (req.method === 'GET') {
                const mode = req.query['hub.mode'];
                const token = req.query['hub.verify_token'];
                const challenge = req.query['hub.challenge'];
                // You would normally check token against DB, hardcoding for simplicity
                if (mode === 'subscribe') {
                    return res.status(200).send(challenge);
                }
            }
            if (req.method === 'POST') {
                await WebhooksService.processMetaLead(organizationId, req.body);
                return res.status(200).send('EVENT_RECEIVED');
            }
        }
        catch (error) {
            logger.error('Meta Webhook Error:', error);
            res.status(500).send('Error');
        }
    }
    static async googleWebhook(req, res, next) {
        try {
            const organizationId = req.params.orgId;
            // Google webhook uses a different verification system if any, or just a simple POST
            await WebhooksService.processGoogleLead(organizationId, req.body);
            return res.status(200).send('EVENT_RECEIVED');
        }
        catch (error) {
            logger.error('Google Webhook Error:', error);
            res.status(500).send('Error');
        }
    }
}
//# sourceMappingURL=webhooks.controller.js.map