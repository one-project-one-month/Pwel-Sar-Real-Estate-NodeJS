import { User } from "../entitiies/User.entity"

export type GetAllRequestType = {
    page?: number
    limit?: number
    searchBy?: string
    searchKeyword?: string
}

export type GetUserListReturnType = {
    users: User[],
    totalCount: number
}

export interface IUserRepository {
    getAll: (params: GetAllRequestType) => Promise<GetUserListReturnType>
    findById: (id: number) => Promise<User>
    create: (data: any) => Promise<User> //:TODO change any
    update: (data: any) => Promise<User>
}