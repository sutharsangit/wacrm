import request from 'supertest';
import app from '../app/app';

// Mock the auth middleware so we bypass database check in unit testing
jest.mock('../middleware/auth.middleware', () => ({
  authenticate: (req: any, res: any, next: any) => {
    req.user = {
      id: 'test-user-id',
      organizationId: 'test-org-id',
      roleId: 'test-role-id'
    };
    next();
  },
  authorize: (permissions: string[]) => (req: any, res: any, next: any) => next()
}));

describe('WhatsApp Business CRM Integration Endpoints', () => {
  it('should mock connect whatsapp onboarding wizard', async () => {
    const res = await request(app)
      .post('/api/v1/whatsapp/connect')
      .send({ type: 'api' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.connectType).toEqual('api');
  });

  it('should mock verify GST and phone number', async () => {
    const res = await request(app)
      .post('/api/v1/whatsapp/verify')
      .send({ phone: '+1 555-019-2834', verifyMethod: 'gst' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toEqual('connected');
  });

  it('should mock send outbound whatsapp message', async () => {
    const res = await request(app)
      .post('/api/v1/whatsapp/send')
      .send({ recipient: '+1 555-019-2834', text: 'Hello!' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toEqual('sent');
  });

  it('should mock get messages', async () => {
    const res = await request(app)
      .get('/api/v1/whatsapp/messages');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should mock get templates', async () => {
    const res = await request(app)
      .get('/api/v1/whatsapp/templates');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should mock send broadcast campaign', async () => {
    const res = await request(app)
      .post('/api/v1/broadcast/send')
      .send({ campaignName: 'Promo', templateId: 't-1' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toEqual('Pending');
  });

  it('should mock get campaigns list', async () => {
    const res = await request(app)
      .get('/api/v1/campaigns');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should mock get contacts', async () => {
    const res = await request(app)
      .get('/api/v1/contacts');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should mock start lead qualification', async () => {
    const res = await request(app)
      .post('/api/v1/qualification/start')
      .send({ leadId: 'lead-1' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toEqual('screening_active');
  });

  it('should mock submit qualification response', async () => {
    const res = await request(app)
      .post('/api/v1/qualification/submit')
      .send({ leadId: 'lead-1', textAnswer: 'Yes' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.qualificationState).toEqual('Hot');
  });
});
