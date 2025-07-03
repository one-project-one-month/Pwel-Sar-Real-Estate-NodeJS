import { Register } from "modules/user/domain/entitiies/auth/Register.entity";
import { prisma } from "../../../../../libs/prismaClients";
import { IRegisterRepository } from "modules/user/domain/repositories/auth/IRegisterRepository";
import bcrypt from "bcrypt";

export class RegisterRepository implements IRegisterRepository {
    async findByEmail(email: string): Promise<Register | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        return user ? new Register(user) : null;
    }

    async create(data: any): Promise<Register> { 
         const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword,
                roleId: 1,
            },
        });

    return new Register(user);
    }
}