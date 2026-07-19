"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class StorageService {
    static async uploadFile(fileName, data) {
        const uploadDir = path_1.default.join(__dirname, '../../../uploads');
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path_1.default.join(uploadDir, fileName);
        fs_1.default.writeFileSync(filePath, data);
        return filePath;
    }
    static getFileUrl(fileName) {
        // Local storage placeholder, later S3 compatible
        return `/uploads/${fileName}`;
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=local.service.js.map