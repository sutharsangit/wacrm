import { Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { AuthRequest } from '../../middleware/auth.middleware';
export class UsersController {
    static async list(req, res, next) {
        try {
            const users = await UsersService.listUsers(req.user.organizationId);
            res.status(200).json({ success: true, data: users });
        }
        catch (error) {
            next(error);
        }
    }
    static async invite(req, res, next) {
        try {
            const user = await UsersService.inviteUser(req.user.organizationId, req.body);
            res.status(201).json({ success: true, message: 'User invited successfully', data: user });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const user = await UsersService.updateUser(req.user.organizationId, req.params.id, req.body);
            res.status(200).json({ success: true, message: 'User updated successfully', data: user });
        }
        catch (error) {
            next(error);
        }
    }
    static async deactivate(req, res, next) {
        try {
            await UsersService.deactivateUser(req.user.organizationId, req.params.id);
            res.status(200).json({ success: true, message: 'User deactivated successfully' });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=users.controller.js.map