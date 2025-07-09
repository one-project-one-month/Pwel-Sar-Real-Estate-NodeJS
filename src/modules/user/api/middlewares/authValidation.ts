import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email().max(52, {
    message:
      'Email must be a valid email address and less than 52 characters long',
  }),
  password: z
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
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(3)
    .max(20, {
      message: 'Username must be between 3 and 20 characters long',
    }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// export const RefreshTokenSchema = z.object({
//   refreshToken: z.string().nonempty()
// });
