import AuthController from "#controllers/auth.controller.js";
import authSchema from "#schemas/auth.schema.js";
import validate from "#utils/validate.js";
import { Router, Request, Response } from "express";
import catchAsync from "#helpers/catchAsync.helper.js";

const authRouter = Router();

authRouter.post('/login', validate(authSchema.loginSchema), AuthController.login);
authRouter.post('/register', validate(authSchema.registerShcema), catchAsync(AuthController.register));

export default authRouter;