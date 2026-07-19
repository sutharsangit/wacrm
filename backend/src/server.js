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
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map