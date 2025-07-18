import { z } from 'zod';

export const getUserListParamSchema = z.object({
  limit: z.number().min(1).optional(),
  page: z.number().min(1).optional(),
  search: z.string().optional().optional(),
  searchBy: z.enum(['username', 'email']).optional(),
});

export type GetUserListParamType = z.infer<typeof getUserListParamSchema>;
