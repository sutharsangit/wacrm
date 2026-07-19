export declare class WebhooksService {
    static processMetaLead(organizationId: string, payload: any): Promise<any>;
    static processGoogleLead(organizationId: string, payload: any): Promise<any>;
    static verifyMetaSignature(payload: string, signature: string, appSecret: string): boolean;
}
//# sourceMappingURL=webhooks.service.d.ts.map