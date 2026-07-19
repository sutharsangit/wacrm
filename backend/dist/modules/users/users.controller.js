"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("./users.service");
class UsersController {
    static async list(req, res, next) {
        try {
            const users = await users_service_1.UsersService.listUsers(req.user.organizationId);
            res.status(200).json({ success: true, data: users });
        }
        catch (error) {
            next(error);
        }
    }
    static async invite(req, res, next) {
        try {
            const user = await users_service_1.UsersService.inviteUser(req.user.organizationId, req.body);
            res.status(201).json({ success: true, message: 'User invited successfully', data: user });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const user = await users_service_1.UsersService.updateUser(req.user.organizationId, req.params.id, req.body);
            res.status(200).json({ success: true, message: 'User updated successfully', data: user });
        }
        catch (error) {
            next(error);
        }
    }
    static async deactivate(req, res, next) {
        try {
            await users_service_1.UsersService.deactivateUser(req.user.organizationId, req.params.id);
            res.status(200).json({ success: true, message: 'User deactivated successfully' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map