import { UserRegister } from '#models/user.model.js';
import AuthService from '#services/auth.service.js';
import { Request, Response, NextFunction } from 'express';

export default class AuthController {
    static async login(req: Request, res: Response) {
        const { username, password, remember } = req.body;
        res.status(200).json({
            message: 'Login successful',
        });
    }

    static async register(req: Request, res: Response, next: NextFunction) {
        const message = await AuthService.register(req.body);
        res.status(201).json({
            message,
        });
    }
    
    static async verifyEmail(req: Request, res: Response) {
        const { token } = req.params;
        await AuthService.verifyEmail(token);
        res.status(200).json({
            message: 'Email verified successfully',
        });
    }
}
