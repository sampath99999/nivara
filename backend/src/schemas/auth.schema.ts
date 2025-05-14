import { z } from "zod";

const loginSchema = z.object({
    username: z.string({message: 'Username is required'}).min(1, "Username is required").max(25, "Username must be less than 25 characters"),
    password: z.string({message: 'Password is required'}).min(1, "Password is required").max(50, "Password must be less than 25 characters"),
    remember: z.boolean().optional(),
});

const registerShcema = z.object({
    username: z.string({message: "Username is required"}).min(1, "Username is required").max(25, "Username must be less than 25 characters"),
    password: z.string({message: "Password is required"}).min(1, "Password is required").max(50, "Password must be less than 25 characters"),
    email: z.string({message: "Email is required"}).email("Invalid email address").min(1, "Email is required").max(50, "Email must be less than 50 characters"),
    first_name: z.string({message: "First Name is required"}).min(1, "First name is required").max(25, "First name must be less than 25 characters"),
    last_name: z.string({message: "Last Name is required"}).min(1, "Last name is required").max(25, "Last name must be less than 25 characters"),
});

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required").max(50, "Email must be less than 50 characters"),
});

const authSchema = {
    loginSchema,
    registerShcema,
    forgotPasswordSchema,
}

export default authSchema;