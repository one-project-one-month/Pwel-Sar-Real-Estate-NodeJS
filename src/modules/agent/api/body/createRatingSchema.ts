import { z } from 'zod';

export const createRatingReqBodySchema = z.object({
  agentId: z.number().min(1),
  point: z.number().min(1).max(5),
});
