import { Schema, ZodError } from "zod";
import { AppError } from "./appError.js";
import { Request, Response, NextFunction } from "express";

export default function validate(schema: Schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({...req.body, ...req.query, ...req.params});
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const message = error.errors[0]?.message || "Invalid request data";
                return next(new AppError(message, 400));
            }
            next(error);
        }
    };
}