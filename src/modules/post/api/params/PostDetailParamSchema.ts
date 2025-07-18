import { z } from 'zod';

export const PostDetailParamSchema = z.object({
  id: z.preprocess((v) => Number(v), z.number().int().positive()),
});
export type PostDetailParamType = z.infer<typeof PostDetailParamSchema>;
