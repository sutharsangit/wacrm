"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app/app"));
const logger_1 = __importDefault(require("./utils/logger"));
const client_1 = require("@prisma/client");
const PORT = process.env.PORT || 3000;
exports.prisma = new client_1.PrismaClient();
const startServer = async () => {
    try {
        await exports.prisma.$connect();
        logger_1.default.info('Database connected successfully');
        app_1.default.listen(PORT, () => {
            logger_1.default.info(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map