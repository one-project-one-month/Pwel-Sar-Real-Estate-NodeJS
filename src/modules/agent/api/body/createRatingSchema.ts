import {z} from 'zod';

export const createRatingReqBodySchema = z.object({
    point: z.number().min(1).max(5),
    agentId: z.number().min(1),
});

