"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = __importDefault(require("../utils/logger"));
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = Number(process.env.REDIS_PORT) || 6379;
exports.redis = new ioredis_1.default({
    host: redisHost,
    port: redisPort,
    maxRetriesPerRequest: null,
});
exports.redis.on('connect', () => {
    logger_1.default.info('Connected to Redis');
});
exports.redis.on('error', (err) => {
    logger_1.default.error('Redis error:', err);
});
//# sourceMappingURL=redis.js.map