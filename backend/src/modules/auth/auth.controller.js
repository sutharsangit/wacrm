import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
export class AuthController {
    static async register(req, res, next) {
        try {
            const result = await AuthService.registerBusiness(req.body);
            res.status(201).json({
                success: true,
                message: 'Business registered successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const tokens = await AuthService.refreshToken(refreshToken);
            res.status(200).json({
                success: true,
                message: 'Token refreshed successfully',
                data: tokens,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=auth.controller.js.map