import { z } from 'zod';

// Define Zod schema for post filters
export const PostFilterQuerySchema = z.object({
  cursor: z.string().optional(),
  maxPrice: z.preprocess(
    (v) => (v === undefined ? undefined : Number(v)),
    z.number().int().nonnegative().optional()
  ),
  minPrice: z.preprocess(
    (v) => (v === undefined ? undefined : Number(v)),
    z.number().int().nonnegative().optional()
  ),
  postType: z.string().optional(),
  propertyType: z.string().optional(),
  region: z.string().optional(),
  search: z.string().trim().optional(), // Add search field
  street: z.string().trim().optional(),
  take: z.preprocess(
    (v) => (v === undefined ? undefined : Number(v)),
    z.number().int().positive().max(100).optional()
  ),
  township: z.string().optional(),
});

// export function postFilterValidation(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const result = PostFilterQuerySchema.safeParse(req.query);
//   if (!result.success) {
//     return res.status(400).json({
//       errors: result.error.errors,
//       message: 'Invalid query parameters',
//     });
//   }
//   (req as any).validatedQuery = result.data;
//   next();
// }
