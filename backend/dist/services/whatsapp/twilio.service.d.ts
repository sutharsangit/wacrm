export declare class TwilioWhatsAppService {
    private static instance;
    static getInstance(): import("twilio/lib/rest/Twilio");
    static sendMessage(from: string, to: string, message: string): Promise<import("twilio/lib/rest/api/v2010/account/message").MessageInstance>;
    static sendTemplate(from: string, to: string, contentSid: string, contentVariables: any): Promise<import("twilio/lib/rest/api/v2010/account/message").MessageInstance>;
}
