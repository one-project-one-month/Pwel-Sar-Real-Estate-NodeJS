import { User } from '../entitiies/User.entity';

export interface GetAllRequestType {
  limit?: number;
  page?: number;
  searchBy?: string;
  searchKeyword?: string;
}

export interface GetUserListReturnType {
  totalCount: number;
  users: User[];
}

export interface IUserRepository {
  create: (data: any) => Promise<User>; //:TODO change any
  findById: (id: number) => Promise<User>;
  getAll: (params: GetAllRequestType) => Promise<GetUserListReturnType>;
  update: (data: any) => Promise<User>;
}
