"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioWhatsAppService = void 0;
const twilio_1 = __importDefault(require("twilio"));
class TwilioWhatsAppService {
    static instance = null;
    static getInstance() {
        if (!this.instance) {
            if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
                throw new Error('Twilio keys not configured');
            }
            this.instance = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        }
        return this.instance;
    }
    static async sendMessage(from, to, message) {
        try {
            const client = this.getInstance();
            const response = await client.messages.create({
                body: message,
                from: `whatsapp:${from}`,
                to: `whatsapp:${to}`,
            });
            return response;
        }
        catch (error) {
            console.error('Error sending Twilio WhatsApp message:', error);
            throw error;
        }
    }
    static async sendTemplate(from, to, contentSid, contentVariables) {
        try {
            const client = this.getInstance();
            const response = await client.messages.create({
                contentSid,
                contentVariables: JSON.stringify(contentVariables),
                from: `whatsapp:${from}`,
                to: `whatsapp:${to}`,
            });
            return response;
        }
        catch (error) {
            console.error('Error sending Twilio WhatsApp template:', error);
            throw error;
        }
    }
}
exports.TwilioWhatsAppService = TwilioWhatsAppService;
//# sourceMappingURL=twilio.service.js.map