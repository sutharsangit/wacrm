import axios from 'axios';

export class MetaWhatsAppService {
  private static getHeaders() {
    const token = process.env.META_WHATSAPP_TOKEN;
    if (!token) throw new Error('META_WHATSAPP_TOKEN is not configured');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  static async sendMessage(phoneNumberId: string, to: string, message: string) {
    try {
      const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
      const payload = {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message },
      };

      const response = await axios.post(url, payload, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error('Error sending Meta WhatsApp message:', error);
      throw error;
    }
  }

  static async sendTemplate(phoneNumberId: string, to: string, templateName: string, languageCode: string, components: any[]) {
    try {
      const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
      const payload = {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: languageCode },
          components,
        },
      };

      const response = await axios.post(url, payload, { headers: this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error('Error sending Meta WhatsApp template:', error);
      throw error;
    }
  }
}
