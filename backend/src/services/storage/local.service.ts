import fs from 'fs';
import path from 'path';

export class StorageService {
  static async uploadFile(fileName: string, data: Buffer): Promise<string> {
    const uploadDir = path.join(__dirname, '../../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, data);
    return filePath;
  }

  static getFileUrl(fileName: string): string {
    // Local storage placeholder, later S3 compatible
    return `/uploads/${fileName}`;
  }
}
