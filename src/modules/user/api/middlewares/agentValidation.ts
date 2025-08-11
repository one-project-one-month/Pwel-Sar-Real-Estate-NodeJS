import { z } from 'zod';

export const AgentSchema = z.object({
  address: z
    .string({
      required_error: 'Address is required',
    })
    .min(15)
    .max(30, {
      message: 'Address must be between 15 and 30 characters long',
    }),
  licenseNumber: z
    .string()
    .min(8, {
      message: 'License number must be at least 8 characters long',
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      {
        message:
          'License number must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      }
    ),
  nrcNumber: z.string().max(25, {
    message: 'NRC must be a valid NRC number and less than 25 characters long',
  }),
  phone: z
    .string({
      required_error: 'Phone number is required',
    })
    .min(10)
    .max(15, {
      message: 'Phone number must be between 10 and 15 characters long',
    }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
