import dotenv from 'dotenv';
dotenv.config();

import app from './app/app';
import logger from './utils/logger';
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 3000;
export const prisma = new PrismaClient();

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.warn('⚠️ Failed to connect to the database. Running in offline/mock-only mode.');
    logger.warn('Note: Endpoints that query the database will fail, but the new WhatsApp mock endpoints will work perfectly.');
    if (process.env.NODE_ENV === 'production') {
      logger.error('Fatal: Database connection required in production. Exiting.', error);
      process.exit(1);
    }
  }

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

startServer();
