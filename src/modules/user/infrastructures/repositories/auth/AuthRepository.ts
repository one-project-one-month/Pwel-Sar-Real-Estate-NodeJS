import { User } from "modules/user/domain/entitiies/User.entity";
import { IAuthRepository } from "modules/user/domain/repositories/auth/AuthRepository";
import { prisma } from "libs/prismaClients";
import { AppError } from "utils/error-handling";
import bcrypt from 'bcrypt';
import { Register } from "modules/user/domain/entitiies/auth/Register.entity";

export class AuthRepository implements IAuthRepository {
	async findByEmail(email: string): Promise<User | null> {
		try {
			const user = await prisma.user.findUnique({ where: { email } });
			if (!user) return null;

			return new User({
				id: user.id,
				email: user.email,
				password: user.password,
				username: user.username,
				roleId: user.roleId,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		} catch (error) {
			throw AppError.new("internalErrorServer", "Cannot find user");
		}
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
