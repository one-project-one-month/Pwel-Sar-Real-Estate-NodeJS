import { z } from 'zod';

export const RequestPasswordResetTokenSchema = z.object({
  email: z.string().email(),
});
