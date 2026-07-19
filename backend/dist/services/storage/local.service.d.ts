export declare class StorageService {
    static uploadFile(fileName: string, data: Buffer): Promise<string>;
    static getFileUrl(fileName: string): string;
}
