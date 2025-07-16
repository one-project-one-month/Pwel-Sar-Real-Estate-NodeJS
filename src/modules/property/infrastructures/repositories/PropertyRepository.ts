import { prisma } from 'libs/prismaClients';
import { AppError, catchErrorAsync } from 'utils/error-handling';

import {
  createPropertyDataType,
  IPropertyRepository,
} from './../../domain/repositories/IPropertyRepository';
export class PropertyRepository implements IPropertyRepository {
  async create(param: createPropertyDataType): Promise<createPropertyDataType> {
    const [error, newProperty] = await catchErrorAsync(
      prisma.property.create({
        data: {
          bathRoom: param.bathRoom,
          bedRoom: param.bedRoom,
          buildingNumber: param.buildingNumber,
          currency: param.currency,
          floor: param.floor,
          latitude: param.latitude,
          length: param.length,
          longitude: param.longitude,
          ownerId: param.ownerId,
          postId: param.postId,
          propertyTypeId: param.propertyTypeId,
          region: param.region,
          street: param.street,
          township: param.township,
          width: param.width,
        },
      })
    );
    if (error || !newProperty)
      throw AppError.new('internalErrorServer', error?.message);
    return {
      ...newProperty,
    };
  }
}
