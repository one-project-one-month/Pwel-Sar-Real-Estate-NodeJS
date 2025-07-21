import { prisma } from 'libs/prismaClients';
import {
  IProperty,
  Property,
} from 'modules/post/domain/entities/Property.entity';
import { AppError } from 'utils/error-handling';

export class PropertyRepository {
  async create(params: IProperty): Promise<Property> {
    try {
      const property = await prisma.property.create({ data: params });

      if (!property) {
        throw new Error('Property not created');
      }

      return new Property(property);
    } catch (error) {
      throw AppError.new(
        'internalErrorServer',
        `Something went wrong: ${error}`
      );
    }
  }
}
