"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksController = void 0;
const webhooks_service_1 = require("./webhooks.service");
const logger_1 = __importDefault(require("../../utils/logger"));
class WebhooksController {
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
                await webhooks_service_1.WebhooksService.processMetaLead(organizationId, req.body);
                return res.status(200).send('EVENT_RECEIVED');
            }
        }
        catch (error) {
            logger_1.default.error('Meta Webhook Error:', error);
            res.status(500).send('Error');
        }
    }
    static async googleWebhook(req, res, next) {
        try {
            const organizationId = req.params.orgId;
            // Google webhook uses a different verification system if any, or just a simple POST
            await webhooks_service_1.WebhooksService.processGoogleLead(organizationId, req.body);
            return res.status(200).send('EVENT_RECEIVED');
        }
        catch (error) {
            logger_1.default.error('Google Webhook Error:', error);
            res.status(500).send('Error');
        }
    }
}
exports.WebhooksController = WebhooksController;
//# sourceMappingURL=webhooks.controller.js.map