import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { ZodError } from 'zod';
export const globalErrorHandler = (err, req, res, next) => {
    logger.error(err);
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: err.errors,
        });
    }
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    // Do not leak stack traces in production
    const response = {
        success: false,
        message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    };
    res.status(statusCode).json(response);
};
//# sourceMappingURL=error.middleware.js.map