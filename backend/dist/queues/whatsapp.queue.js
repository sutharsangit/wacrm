"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappQueue = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const logger_1 = __importDefault(require("../utils/logger"));
const meta_service_1 = require("../services/whatsapp/meta.service");
const twilio_service_1 = require("../services/whatsapp/twilio.service");
exports.whatsappQueue = new bullmq_1.Queue('whatsapp', { connection: redis_1.redis });
const worker = new bullmq_1.Worker('whatsapp', async (job) => {
    const { provider, from, to, message, templateName, languageCode, components } = job.data;
    logger_1.default.info(`Processing whatsapp job ${job.id}`);
    if (provider === 'meta') {
        if (templateName) {
            await meta_service_1.MetaWhatsAppService.sendTemplate(from, to, templateName, languageCode, components);
        }
        else {
            await meta_service_1.MetaWhatsAppService.sendMessage(from, to, message);
        }
    }
    else if (provider === 'twilio') {
        if (templateName) {
            // Here we map templateName to contentSid for twilio just as a placeholder
            await twilio_service_1.TwilioWhatsAppService.sendTemplate(from, to, templateName, components);
        }
        else {
            await twilio_service_1.TwilioWhatsAppService.sendMessage(from, to, message);
        }
    }
}, { connection: redis_1.redis });
worker.on('completed', (job) => {
    logger_1.default.info(`WhatsApp job ${job.id} completed successfully`);
});
worker.on('failed', (job, err) => {
    logger_1.default.error(`WhatsApp job ${job?.id} failed:`, err);
});
//# sourceMappingURL=whatsapp.queue.js.map