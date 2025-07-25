import { Owner } from '../entitiies/Owner.entity';

export interface GetAllOwnerRequestType {
  limit?: number;
  page: number;
  searchBy?: string;
  searchKeyword: string;
}

export interface GetOwnerListReturnType {
  owners: Owner[];
  totalCount: number;
}

export interface IOwnerRepository {
  // eslint-disable-next-line no-unused-vars
  create: (data: any) => Promise<Owner>;
  // eslint-disable-next-line no-unused-vars
  findById: (id: number) => Promise<Owner>;
  // eslint-disable-next-line no-unused-vars
  getAll: (params: GetAllOwnerRequestType) => Promise<GetOwnerListReturnType>;
}
