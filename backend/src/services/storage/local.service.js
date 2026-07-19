import fs from 'fs';
import path from 'path';
export class StorageService {
    static async uploadFile(fileName, data) {
        const uploadDir = path.join(__dirname, '../../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, data);
        return filePath;
    }
    static getFileUrl(fileName) {
        // Local storage placeholder, later S3 compatible
        return `/uploads/${fileName}`;
    }
}
//# sourceMappingURL=local.service.js.map