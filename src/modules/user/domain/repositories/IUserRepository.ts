import { User } from "../entitiies/User.entity"

export interface IUserRepository {
    getAll: () => Promise<User[]>
    findById: (id: number) => Promise<User>
    create: (data: any) => Promise<User> //:TODO change any
    update: (data: any) => Promise<User>
}