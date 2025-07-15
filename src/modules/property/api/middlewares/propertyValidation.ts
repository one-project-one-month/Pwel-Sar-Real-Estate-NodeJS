import { z } from 'zod';

export const PropertySchema = z.object({
  bathRoom: z.number(),
  bedRoom: z.number(),
  buildingNumber: z.string(),
  currency: z.string(),
  floor: z.number(),
  latitude: z.string(),
  length: z.number(),
  longitude: z.string(),
  ownerId: z.number(),
  propertyTypeId: z.number(),
  region: z.string(),
  street: z.string(),
  township: z.string(),
  width: z.number(),
});
