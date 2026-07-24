import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import logger from '../utils/logger';
import { globalErrorHandler } from '../middleware/error.middleware';
import authRoutes from '../modules/auth/auth.routes';
import usersRoutes from '../modules/users/users.routes';
import organizationsRoutes from '../modules/organizations/organizations.routes';
import leadsRoutes from '../modules/leads/leads.routes';
import crmRoutes from '../modules/crm/crm.routes';
import analyticsRoutes from '../modules/analytics/analytics.routes';
import webhooksRoutes from '../modules/webhooks/webhooks.routes';
import billingRoutes from '../modules/billing/billing.routes';
import settingsRoutes from '../modules/settings/settings.routes';
import { 
  whatsappRouter, 
  broadcastRouter, 
  campaignsRouter, 
  contactsRouter, 
  qualificationRouter 
} from '../modules/whatsapp/whatsapp.routes';
import { setupSwagger } from '../config/swagger';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Request Logger
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

// Routes Placeholder
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Swagger
setupSwagger(app);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/organizations', organizationsRoutes);
app.use('/api/v1/leads', leadsRoutes);
app.use('/api/v1/crm', crmRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/webhooks', webhooksRoutes);
app.use('/api/v1/billing', billingRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/whatsapp', whatsappRouter);
app.use('/api/v1/broadcast', broadcastRouter);
app.use('/api/v1/campaigns', campaignsRouter);
app.use('/api/v1/contacts', contactsRouter);
app.use('/api/v1/qualification', qualificationRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
