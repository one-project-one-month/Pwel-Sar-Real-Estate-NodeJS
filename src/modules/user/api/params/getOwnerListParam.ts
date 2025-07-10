import {z} from 'zod';

export const getOwnerListParamSchema = z.object({
    page: z.number().min(1).optional(),
    limit: z.number().min(1).optional(),
    search: z.string().optional().optional(),
    searchBy: z.enum(['username', 'address']).optional(),
});

export type GetOwnerListParamType = z.infer<typeof getOwnerListParamSchema>;