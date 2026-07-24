import { Router } from 'express';
import { WhatsappController } from './whatsapp.controller';
import { authenticate } from '../../middleware/auth.middleware';

const whatsappRouter = Router();
const broadcastRouter = Router();
const campaignsRouter = Router();
const contactsRouter = Router();
const qualificationRouter = Router();

// Secure all modules endpoints with authentication middleware
whatsappRouter.use(authenticate);
broadcastRouter.use(authenticate);
campaignsRouter.use(authenticate);
contactsRouter.use(authenticate);
qualificationRouter.use(authenticate);

// 1. WhatsApp core routes
whatsappRouter.post('/connect', WhatsappController.connect);
whatsappRouter.post('/verify', WhatsappController.verify);
whatsappRouter.post('/send', WhatsappController.send);
whatsappRouter.get('/messages', WhatsappController.getMessages);
whatsappRouter.get('/templates', WhatsappController.getTemplates);

// 2. Broadcast
broadcastRouter.post('/send', WhatsappController.sendBroadcast);

// 3. Campaigns
campaignsRouter.get('/', WhatsappController.getCampaigns);

// 4. Contacts
contactsRouter.get('/', WhatsappController.getContacts);

// 5. Qualification
qualificationRouter.post('/start', WhatsappController.startQualification);
qualificationRouter.post('/submit', WhatsappController.submitQualification);

export {
  whatsappRouter,
  broadcastRouter,
  campaignsRouter,
  contactsRouter,
  qualificationRouter
};
