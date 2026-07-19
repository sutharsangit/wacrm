"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaWhatsAppService = void 0;
const axios_1 = __importDefault(require("axios"));
class MetaWhatsAppService {
    static getHeaders() {
        const token = process.env.META_WHATSAPP_TOKEN;
        if (!token)
            throw new Error('META_WHATSAPP_TOKEN is not configured');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }
    static async sendMessage(phoneNumberId, to, message) {
        try {
            const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
            const payload = {
                messaging_product: 'whatsapp',
                to,
                type: 'text',
                text: { body: message },
            };
            const response = await axios_1.default.post(url, payload, { headers: this.getHeaders() });
            return response.data;
        }
        catch (error) {
            console.error('Error sending Meta WhatsApp message:', error);
            throw error;
        }
    }
    static async sendTemplate(phoneNumberId, to, templateName, languageCode, components) {
        try {
            const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
            const payload = {
                messaging_product: 'whatsapp',
                to,
                type: 'template',
                template: {
                    name: templateName,
                    language: { code: languageCode },
                    components,
                },
            };
            const response = await axios_1.default.post(url, payload, { headers: this.getHeaders() });
            return response.data;
        }
        catch (error) {
            console.error('Error sending Meta WhatsApp template:', error);
            throw error;
        }
    }
}
exports.MetaWhatsAppService = MetaWhatsAppService;
//# sourceMappingURL=meta.service.js.map