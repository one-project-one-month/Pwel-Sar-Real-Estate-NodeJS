import { AppError } from "utils/error-handling";

export type RegisterParams = {
    id: number,
    username: string,
    email: string,
    password: string,
    roleId: number,
    createdAt: Date,
    updatedAt: Date
}
export class Register {
    id: number;
    username: string;
    email: string;
    password: string;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;

    constructor({
        id,
        username,
        email,
        password,
        roleId,
        createdAt,
        updatedAt
    } : RegisterParams) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roleId = roleId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    isAdmin(): boolean {
        return this.roleId === 1; //:TODO 
    }

    chanageRole(roleId: number) { //:TODO 
        const isAdminAlready = true; //:TODO check admin
        if(isAdminAlready) {
            throw AppError.new('forbidden', "you can't change role");
        }
        this.roleId = roleId;
    }
  }