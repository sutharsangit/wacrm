export declare class SettingsService {
    static getSettings(organizationId: string): Promise<{
        id: string;
        organizationId: string;
        key: string;
        value: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    static updateSetting(organizationId: string, key: string, value: any): Promise<{
        id: string;
        organizationId: string;
        key: string;
        value: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
