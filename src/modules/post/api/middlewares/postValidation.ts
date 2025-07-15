import { PostStatus, PostType } from 'modules/post/domain/entities/Post.entity';
import { PropertySchema } from 'modules/property/api/middlewares/propertyValidation';
import { z } from 'zod';
export const PostRegisterSchema = z.object({
  phone: z.string().min(4).max(15, {
    message: 'Username must be between 4 and 15 characters long',
  }),
  property: PropertySchema.optional(),
  type: z.enum([PostType.RENT, PostType.SALE], {
    invalid_type_error: 'type must be rent or sale',
    required_error: 'type is required',
  }),
  userId: z.number({
    message: 'User Id is required and must be number',
  }),
});

export const PostUpdateSchema = z.object({
  status: z.enum(Object.values(PostStatus) as [string, ...string[]], {
    invalid_type_error: 'status must be active, pending, rented or sold',
    required_error: 'status is required',
  }),
});
