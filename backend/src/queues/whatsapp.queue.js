import { Queue, Worker } from 'bullmq';
import { redis } from '../config/redis';
import logger from '../utils/logger';
import { MetaWhatsAppService } from '../services/whatsapp/meta.service';
import { TwilioWhatsAppService } from '../services/whatsapp/twilio.service';
export const whatsappQueue = new Queue('whatsapp', { connection: redis });
const worker = new Worker('whatsapp', async (job) => {
    const { provider, from, to, message, templateName, languageCode, components } = job.data;
    logger.info(`Processing whatsapp job ${job.id}`);
    if (provider === 'meta') {
        if (templateName) {
            await MetaWhatsAppService.sendTemplate(from, to, templateName, languageCode, components);
        }
        else {
            await MetaWhatsAppService.sendMessage(from, to, message);
        }
    }
    else if (provider === 'twilio') {
        if (templateName) {
            // Here we map templateName to contentSid for twilio just as a placeholder
            await TwilioWhatsAppService.sendTemplate(from, to, templateName, components);
        }
        else {
            await TwilioWhatsAppService.sendMessage(from, to, message);
        }
    }
}, { connection: redis });
worker.on('completed', (job) => {
    logger.info(`WhatsApp job ${job.id} completed successfully`);
});
worker.on('failed', (job, err) => {
    logger.error(`WhatsApp job ${job?.id} failed:`, err);
});
//# sourceMappingURL=whatsapp.queue.js.map