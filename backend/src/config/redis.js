import Redis from 'ioredis';
import logger from '../utils/logger';
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = Number(process.env.REDIS_PORT) || 6379;
export const redis = new Redis({
    host: redisHost,
    port: redisPort,
    maxRetriesPerRequest: null,
});
redis.on('connect', () => {
    logger.info('Connected to Redis');
});
redis.on('error', (err) => {
    logger.error('Redis error:', err);
});
//# sourceMappingURL=redis.js.map