import { prisma } from 'libs/prismaClients';
import { GetOwnerListParamType } from 'modules/user/api/params/getOwnerListParam';
import {
  GetAllOwnerRequestType,
  IPropertyOwnerRepository,
} from 'modules/user/domain/repositories/IOwnerRepository';
import { catchErrorAsync } from 'utils/error-handling/CatchError';
import Pagination from 'utils/pagination/Pagination';

import { OwnerDTO } from '../dtos/OwnerDTO';

interface IPropertyOwnerCase {
  execute(param: any): Promise<OwnerDTO>;
}

export class CreatePropertyOwnerUseCase implements IPropertyOwnerCase {
  constructor(private readonly OwnerRepo: IPropertyOwnerRepository) {}

  async execute(param: any): Promise<OwnerDTO> {
    console.log('Received param for creation:', param);

    const authuser = await prisma.user.findUnique({
      where: { email: param.user.email },
    });

    if (!authuser) {
      throw new Error('User not found with given identifier');
    }

    const createData = {
      address: param.address,
      nrcNo: param.nrcNo,
      userId: authuser.id,
    };

    const [error, owner] = await catchErrorAsync(
      this.OwnerRepo.create(createData)
    );
    if (error) throw error;
    return new OwnerDTO(owner);
  }
}

export class GetOwnerListUseCase {
  constructor(private readonly OwnerRepo: IPropertyOwnerRepository) {}
  async execute(
    params: GetOwnerListParamType
  ): Promise<Pagination<OwnerDTO[]>> {
    const pageNum = params.page || 0;
    const limitNum = params.limit || 20;

    const [error, results] = await catchErrorAsync(
      this.OwnerRepo.getAll({
        limit: limitNum,
        page: pageNum,
        searchBy: params.searchBy as GetAllOwnerRequestType['searchBy'],
        searchKeyword: params.search ?? '',
      })
    );

    if (error) {
      throw error;
    }

    const ownerLists = results.owners.map((user) => new OwnerDTO(user));
    const paginationResult = Pagination.new(
      pageNum,
      limitNum,
      results.totalCount,
      ownerLists
    ).getResult();
    return paginationResult;
  }
}

export class GetPropertyOwnerByIdUseCase implements IPropertyOwnerCase {
  constructor(private readonly OwnerRepo: IPropertyOwnerRepository) {}

  async execute(id: number): Promise<OwnerDTO> {
    const [owner, error] = await catchErrorAsync(this.OwnerRepo.findById(id));
    if (error) throw error;
    return new OwnerDTO(owner);
  }
}
