import request from 'supertest';
import app from '../app/app';
describe('App Endpoints', () => {
    it('should return 200 for health check', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
//# sourceMappingURL=app.test.js.map