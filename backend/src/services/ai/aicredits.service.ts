import axios from 'axios';

export class AiCreditsService {
  private static getHeaders() {
    const apiKey = process.env.AICREDITS_API_KEY;
    if (!apiKey) {
      throw new Error('AICREDITS_API_KEY is not configured');
    }
    return {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  static async generateLeadScore(leadData: any, conversationHistory: any[]) {
    try {
      const response = await axios.post(
        'https://api.aicredits.in/v1/chat/completions', // Assuming standard OpenAI compatible endpoint
        {
          model: 'gpt-4o-mini', // or whatever model they support
          messages: [
            {
              role: 'system',
              content: 'You are an AI assistant that scores leads from 0 to 100 based on their profile and conversation history. Return only a JSON object like {"score": 85, "reason": "Interested in premium plan"}.',
            },
            {
              role: 'user',
              content: JSON.stringify({ leadData, conversationHistory }),
            },
          ],
          response_format: { type: 'json_object' }
        },
        { headers: this.getHeaders() }
      );

      const content = response.data.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('Error generating lead score:', error);
      throw error;
    }
  }

  static async summarizeConversation(conversationHistory: any[]) {
    try {
      const response = await axios.post(
        'https://api.aicredits.in/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Summarize the following WhatsApp conversation between a business and a lead. Provide a short 3-sentence summary.',
            },
            {
              role: 'user',
              content: JSON.stringify(conversationHistory),
            },
          ],
        },
        { headers: this.getHeaders() }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error summarizing conversation:', error);
      throw error;
    }
  }
}
