import { PostStatus, PostType } from 'modules/post/domain/entities/Post.entity';
import { PropertySchema } from 'modules/property/api/middlewares/propertyValidation';
import { z } from 'zod';

// export const PropertySchema = z.object({
//   bathRoom: z.number(),
//   bedRoom: z.number(),
//   buildingNumber: z.string(),
//   currency: z.string(),
//   floor: z.number(),
//   latitude: z.string(),
//   length: z.number(),
//   longitude: z.string(),
//   ownerId: z.number(),
//   propertyTypeId: z.number(),
//   region: z.string(),
//   street: z.string(),
//   township: z.string(),
//   width: z.number(),
// });

export const PostRegisterSchema = z.object({
  post: z.object({
    phone: z.string().min(4).max(15, {
      message: 'Phone must be between 4 and 15 characters long',
    }),
    type: z.enum([PostType.Lease, PostType.Rent, PostType.Sale], {
      invalid_type_error: 'type must be rent or sale or lease',
      required_error: 'type is required',
    }),
    userId: z.number({
      message: 'User Id is required and must be number',
    }),
  }),
  property: PropertySchema,
});

export const PostUpdateSchema = z.object({
  status: z.enum(Object.values(PostStatus) as [string, ...string[]], {
    invalid_type_error: 'status must be active, pending, rented or sold',
    required_error: 'status is required',
  }),
});

export const PostsArraySchema = z.object({
  posts: z.array(PostRegisterSchema),
});
