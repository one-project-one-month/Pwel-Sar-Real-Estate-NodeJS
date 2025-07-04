import bcrypt from 'bcrypt';
import { prisma } from "libs/prismaClients";
import { Register, RegisterParams } from "modules/user/domain/entitiies/auth/Register.entity";
import { IRegisterRepository } from "modules/user/domain/repositories";

export class RegisterRepository implements IRegisterRepository {
 async findByEmail(email: string): Promise<Register | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? new Register(user as RegisterParams) : null;
  }

  async create(data: any): Promise<Register> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
     const user = await prisma.user.create({ 
            data: {
        ...data,
        password: hashedPassword,
      },
      });
            const newUser = new Register({
                'id': user.id,
                'email': user.email,
                'password': user.password,
                'username': user.username,
                'roleId': user.roleId,
                'createdAt': user.createdAt,
                'updatedAt': user.updatedAt
            });
            return newUser;
  }
}
