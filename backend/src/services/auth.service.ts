import MailHelper from "#helpers/mail.helper.js";
import {
  UserRegister,
  IUser,
  IUserDocument,
  User,
} from "#models/user.model.js";
import { AppError } from "#utils/appError.js";
import { Encrypter } from "#utils/bcrypt.js";

export default class AuthService {
  static async register(userData: UserRegister): Promise<string> {
    try {
      await this.checkUsernameExists(userData.username);
      await this.checkEmailExists(userData.email);

      userData.password = Encrypter.hashPassword(userData.password);
      const user = new User(userData);
      await user.save();

      try {
        await this.sendEmailVerification(user);
      } catch (error) {
        console.error("Error sending verification email:", error);
        await user.deleteOne();
        throw new AppError("Failed to send verification email", 500);
      }

      return "User registered successfully and verification email sent";
    } catch (error) {
      throw error;
    }
  }

  static async checkUsernameExists(username: string): Promise<boolean> {
    const user = await User.findOne({ username });
    if (user) {
      throw new AppError("Username already exists", 400);
    }
    return false;
  }

  static async checkEmailExists(email: string): Promise<boolean> {
    const user = await User.findOne({ email });
    if (user) {
      throw new AppError("Email already exists", 400);
    }
    return false;
  }

  static async sendEmailVerification(user: IUserDocument): Promise<boolean> {
    const token = await Encrypter.mailTokenGenerate();

    user.email_verification_token = token;
    user.email_verification_token_expires = new Date(
      Date.now() + 60 * 60 * 1000
    ); // 1 hour
    await user.save();

    const verificationLink = `${process.env.APP_UI_URL}/verify-email?token=${token}`;
    const subject = "Email Verification";
    const text = `Hi ${user.first_name},<br> Please verify your email by clicking on the following link: ${verificationLink}`;
    const mailSent = await MailHelper.sendMail(user.email, subject, text);
    if (!mailSent) {
      throw new AppError("Failed to send verification email", 500);
    }

    return true;
  }

  static async verifyEmail(token: string): Promise<boolean> {
    if (!token) {
      throw new AppError("Token is required", 400);
    }
    const user = await User.findOne({
      email_verification_token: token,
      email_verification_token_expires: { $gt: new Date() },
    });
    if (!user) {
      throw new AppError("Invalid or expired token", 400);
    }
    user.email_verified = true;
    user.email_verification_token = null;
    user.email_verification_token_expires = null;
    await user.save();
    return true;
  }
}
