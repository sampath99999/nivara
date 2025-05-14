import { CustomError } from '#types/CustomError.js';
import { AppError } from '#utils/appError.js';
import { Request, Response } from 'express';

export default function errorHandler(
    err: CustomError,
    req: Request,
    res: Response,
    next: Function,
) {
    const statusCode = err.statusCode || 500;
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isAppError = err instanceof AppError;

    const response = {
        message: isAppError ? err.message : (isDevelopment ? err.message : 'Internal Server Error'),
        ...(isDevelopment && !isAppError && { stack: err.stack })
    };

    res.status(statusCode).json(response);
}
