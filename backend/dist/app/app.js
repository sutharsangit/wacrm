"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_1 = __importDefault(require("../utils/logger"));
const error_middleware_1 = require("../middleware/error.middleware");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const users_routes_1 = __importDefault(require("../modules/users/users.routes"));
const organizations_routes_1 = __importDefault(require("../modules/organizations/organizations.routes"));
const leads_routes_1 = __importDefault(require("../modules/leads/leads.routes"));
const crm_routes_1 = __importDefault(require("../modules/crm/crm.routes"));
const analytics_routes_1 = __importDefault(require("../modules/analytics/analytics.routes"));
const webhooks_routes_1 = __importDefault(require("../modules/webhooks/webhooks.routes"));
const billing_routes_1 = __importDefault(require("../modules/billing/billing.routes"));
const settings_routes_1 = __importDefault(require("../modules/settings/settings.routes"));
const swagger_1 = require("../config/swagger");
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rate Limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Request Logger
app.use((req, res, next) => {
    logger_1.default.info(`[${req.method}] ${req.url}`);
    next();
});
// Routes Placeholder
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' });
});
// Swagger
(0, swagger_1.setupSwagger)(app);
// API Routes
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/users', users_routes_1.default);
app.use('/api/v1/organizations', organizations_routes_1.default);
app.use('/api/v1/leads', leads_routes_1.default);
app.use('/api/v1/crm', crm_routes_1.default);
app.use('/api/v1/analytics', analytics_routes_1.default);
app.use('/api/v1/webhooks', webhooks_routes_1.default);
app.use('/api/v1/billing', billing_routes_1.default);
app.use('/api/v1/settings', settings_routes_1.default);
// Global Error Handler
app.use(error_middleware_1.globalErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map