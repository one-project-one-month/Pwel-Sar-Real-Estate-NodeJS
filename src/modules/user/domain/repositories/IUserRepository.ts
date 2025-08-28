
import { User } from '../entities/User.entity';

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
    // eslint-disable-next-line no-unused-vars
    create: (data: any) => Promise<User>; //:TODO change any
    // eslint-disable-next-line no-unused-vars
    findById: (id: number) => Promise<User>;
    // eslint-disable-next-line no-unused-vars
    getAll: (params: GetAllRequestType) => Promise<GetUserListReturnType>;
    // eslint-disable-next-line no-unused-vars
    update: (data: any) => Promise<User>;
    // eslint-disable-next-line no-unused-vars
    uploadPhoto: (userId: number, photoUrl: string) => Promise<User>;
}
