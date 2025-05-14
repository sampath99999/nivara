import { AppError } from '#utils/appError.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export default class MailHelper {
    static async sendMail(to: string, subject: string, text: string) {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: `Sampath Bandla <${process.env.MAIL_USER}>`,
            to,
            subject,
            text,
        };

        try {
            await transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.log('Error sending email:', error);
            throw new AppError('Failed to send email', 500);
        }
    }
}
