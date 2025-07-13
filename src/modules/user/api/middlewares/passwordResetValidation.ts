import { z } from 'zod';

export const RequestPasswordResetTokenSchema = z.object({
  email: z.string().email(),
});

export const PasswordResetSchema = z.object({
  email: z.string().email(),
  newPassword: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      }
    ),
  token: z.string().min(6),
});
