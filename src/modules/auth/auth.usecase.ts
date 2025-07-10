import { inject, injectable } from 'tsyringe';
import { IAuthUsecase } from './interfaces/auth.usecase.interface';
import {
  UserLoginRequestDto,
  UserRegistrationRequestDto,
} from './dtos/auth.request.dto';
import { IAuthRepository } from './interfaces/auth.repo.interface';
import { AppError, catchErrorAsync } from 'utils/error-handling';
import { UserResponseDto } from 'modules/user/dtos/user.response.dto';
import bcrypt from 'bcrypt';
import { generateTokens } from 'utils/auth/auth.service';

@injectable()
export default class AuthUsecase implements IAuthUsecase {
  constructor(
    @inject('IAuthRepository') private readonly _authRepo: IAuthRepository
  ) {}

  async registerUserAsync(
    req: UserRegistrationRequestDto
  ): Promise<UserResponseDto> {
    try {
      return await this._authRepo.registerUserAsync(req);
    } catch (err: any) {
      if (err.code === 'P2002') {
        throw AppError.new('alreadyExist', 'User already exists.');
      }

      throw AppError.new(
        'internalErrorServer',
        'Something went wrong on the server.'
      );
    }
  }

  async checkRolePermission(params: any): Promise<any> {
    const [errors, permissons] = await catchErrorAsync(
      this._authRepo.getPermissionByRoleId(params.roleID),
      [AppError]
    );
    if (errors || !permissons) {
      throw AppError.new(
        'internalErrorServer',
        'prisma error: while getting all permissions'
      );
    }
    return permissons.some(
      (perm) =>
        perm.resource === params.resource && perm.action === params.action
    );
  }

  async loginUserAsync(req: UserLoginRequestDto): Promise<any> {
    const user = await this._authRepo.findByEmail(req.email);

    if (!user) throw AppError.new('badRequest', 'Invalid email or password');

    const isMatch = await bcrypt.compare(req.passwrod, user.password);

    if (!isMatch)
      throw AppError.new('notAuthorized', 'Invalid email or password');

    return generateTokens(user);
  }

  async logoutUserAsync(): Promise<UserResponseDto> {
    throw AppError.new('internalErrorServer');
  }
}
