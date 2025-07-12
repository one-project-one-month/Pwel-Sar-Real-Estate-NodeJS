import { prisma } from 'libs/prismaClients';
import { OwnerDTO } from 'modules/user/applications/dtos/OwnerDTO';
import {
  PropertyOwner,
  PropertyOwnerParams,
} from 'modules/user/domain/entitiies/Owner.entity';
import {
  GetAllOwnerRequestType,
  GetOwnerListReturnType,
  IPropertyOwnerRepository,
} from 'modules/user/domain/repositories/IOwnerRepository';
import { AppError, catchErrorAsync } from 'utils/error-handling';

export class PropertyOwnerRepository implements IPropertyOwnerRepository {
  async create(data: PropertyOwnerParams): Promise<PropertyOwner> {
    try {
      const propertyOwner = await prisma.ownerProfile.create({
        data: {
          address: data.address,
          nrcNo: data.nrcNo,
          userId: data.userId,
        },
      });
      const newOwner = new PropertyOwner({
        address: propertyOwner.address,
        id: propertyOwner.id,
        nrcNo: propertyOwner.nrcNo,
        userId: propertyOwner.userId,
      });
      return newOwner;
    } catch (error) {
      console.log(error);
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while creating property owner profile'
      );
    }
  }

  async findById(id: number): Promise<OwnerDTO> {
    try {
      const propertyOwner = await prisma.ownerProfile.findUnique({
        include: { user: true },
        where: { id },
      });

      if (!propertyOwner) {
        throw AppError.new('badRequest', 'Owner not found');
      }
      return new OwnerDTO({
        address: propertyOwner.address,
        email: propertyOwner.user?.email,
        id: propertyOwner.id,
        nrcNo: propertyOwner.nrcNo,
        userId: propertyOwner.userId,
        username: propertyOwner.user?.username,
      });
    } catch (error) {
      console.log(error);
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while getting property owner by id'
      );
    }
  }

  async getAll(
    params: GetAllOwnerRequestType
  ): Promise<GetOwnerListReturnType> {
    const { limit = 20, page = 0 } = params;

    try {
      const ownerFilter = this.getListFilter(params);
      const [errors, result] = await catchErrorAsync(
        prisma.$transaction([
          prisma.ownerProfile.findMany({
            include: {
              user: true,
            },
            orderBy: {},
            skip: page * limit,
            take: limit,
            where: ownerFilter,
          }),
          prisma.ownerProfile.count({
            where: ownerFilter,
          }),
        ])
      );

      console.log(errors);
      if (errors || !result)
        throw AppError.new(
          'internalErrorServer',
          'prisma error: while getting all users'
        );

      const [rawOwners, ownersCount] = result;

      const owners = rawOwners.map(
        (owner) =>
          new OwnerDTO({
            address: owner.address,
            email: owner.user?.email,
            id: owner.id,
            nrcNo: owner.nrcNo,
            userId: owner.userId,
            username: owner.user?.username,
          })
      );
      return {
        owners,
        totalCount: ownersCount,
      };
    } catch (error) {
      console.log(error);
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while getting all property owners'
      );
    }
  }

  private getListFilter = (params: GetAllOwnerRequestType) => {
    const { searchBy, searchKeyword } = params;
    if (!searchBy || !searchKeyword) return {};

    if (searchBy === 'username') {
      return {
        user: {
          is: {
            username: {
              contains: searchKeyword,
            },
          },
        },
      };
    } else if (searchBy === 'address') {
      return {
        address: {
          contains: searchKeyword,
        },
      };
    }
    return {};
  };
}
