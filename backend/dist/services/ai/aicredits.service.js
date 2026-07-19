"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiCreditsService = void 0;
const axios_1 = __importDefault(require("axios"));
class AiCreditsService {
    static getHeaders() {
        const apiKey = process.env.AICREDITS_API_KEY;
        if (!apiKey) {
            throw new Error('AICREDITS_API_KEY is not configured');
        }
        return {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        };
    }
    static async generateLeadScore(leadData, conversationHistory) {
        try {
            const response = await axios_1.default.post('https://api.aicredits.in/v1/chat/completions', // Assuming standard OpenAI compatible endpoint
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
            }, { headers: this.getHeaders() });
            const content = response.data.choices[0].message.content;
            return JSON.parse(content);
        }
        catch (error) {
            console.error('Error generating lead score:', error);
            throw error;
        }
    }
    static async summarizeConversation(conversationHistory) {
        try {
            const response = await axios_1.default.post('https://api.aicredits.in/v1/chat/completions', {
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
            }, { headers: this.getHeaders() });
            return response.data.choices[0].message.content;
        }
        catch (error) {
            console.error('Error summarizing conversation:', error);
            throw error;
        }
    }
}
exports.AiCreditsService = AiCreditsService;
//# sourceMappingURL=aicredits.service.js.map