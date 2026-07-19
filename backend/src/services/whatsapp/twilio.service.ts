import twilio from 'twilio';

export class TwilioWhatsAppService {
  private static instance: twilio.Twilio | null = null;

  static getInstance() {
    if (!this.instance) {
      if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
        throw new Error('Twilio keys not configured');
      }
      this.instance = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
    return this.instance;
  }

  static async sendMessage(from: string, to: string, message: string) {
    try {
      const client = this.getInstance();
      const response = await client.messages.create({
        body: message,
        from: `whatsapp:${from}`,
        to: `whatsapp:${to}`,
      });
      return response;
    } catch (error) {
      console.error('Error sending Twilio WhatsApp message:', error);
      throw error;
    }
  }

  static async sendTemplate(from: string, to: string, contentSid: string, contentVariables: any) {
    try {
      const client = this.getInstance();
      const response = await client.messages.create({
        contentSid,
        contentVariables: JSON.stringify(contentVariables),
        from: `whatsapp:${from}`,
        to: `whatsapp:${to}`,
      });
      return response;
    } catch (error) {
      console.error('Error sending Twilio WhatsApp template:', error);
      throw error;
    }
  }
}
