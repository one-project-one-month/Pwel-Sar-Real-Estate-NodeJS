import { IAuthRepository } from "./interfaces/auth.repo.interface";
import { injectable } from "tsyringe";
import { prisma } from "libs/prismaClients";
import { User } from "../../entities/index";
import bcrypt from "bcrypt";
import { UserRegistrationRequestDto } from "./dtos/auth.request.dto";

@injectable()
export class AuthRepository implements IAuthRepository {
  // register user
  async registerUserAsync(req: UserRegistrationRequestDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(req.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: req.username,
        email: req.email,
        password: hashedPassword,
        photo: req.photo,
        roleId: req.roleId,
      },
    });

    return new User({ ...newUser });
  }
}
