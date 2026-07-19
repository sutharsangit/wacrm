"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app/app"));
describe('App Endpoints', () => {
    it('should return 200 for health check', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
//# sourceMappingURL=app.test.js.map