import { NextFunction, Request, Response } from "express";
import { ApproveOwnerProfileUseCase, CreatePropertyOwnerUseCase, DeleteOwnerProfileUseCase, GetOwnerListUseCase, GetPropertyOwnerByIdUseCase, RejectOwnerProfileUseCase } from "modules/user/applications/usecase/GetOwnerListUseCase";
import { PropertyOwnerRepository } from "modules/user/infrastructures/repositories/OwnerRepository";
import { catchErrorAsync } from "utils/error-handling/CatchError";
import { GetOwnerListParamType } from "../params/getOwnerListParam";
import { AppError, errorKinds } from "utils/error-handling/AppError";
import { prisma } from "libs/prismaClients";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    roleId: number;
  };
}



const getPropertyOwnerList = new GetOwnerListUseCase(new PropertyOwnerRepository())
const getPropertyOwnerByIdUseCase = new GetPropertyOwnerByIdUseCase(new PropertyOwnerRepository())
const createPropertyOwnerUseCase = new CreatePropertyOwnerUseCase(new PropertyOwnerRepository())
const approveOwnerProfileUseCase = new ApproveOwnerProfileUseCase(new PropertyOwnerRepository())
const rejectOwnerProfileUseCase = new RejectOwnerProfileUseCase(new PropertyOwnerRepository())
const deleteOwnerProfileUseCase = new DeleteOwnerProfileUseCase(new PropertyOwnerRepository())

class OwnerController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    // const [owners, error] = await catchErrorAsync(getPropertyOwnerList.execute({}))
    // if (error) return next(error);
    // res.status(200).json(owners);

    try {
      const { page, limit, search, searchBy } = req.query
      const pageNum = parseInt(page as string, 10) || undefined;
      const limitNum = parseInt(limit as string, 10) || undefined;
      const result = await getPropertyOwnerList.execute({
        page: pageNum,
        limit: limitNum,
        search: search as string | undefined,
        searchBy: searchBy as GetOwnerListParamType['searchBy']
      })
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in getAll:", error);
      error instanceof AppError
        ? next(error)
        : next(AppError.new(errorKinds.internalServerError, "userController : internal Server Error"));
    }
  }
  async findById(req: Request, res: Response, next: NextFunction) {
    const [error, owner] = await catchErrorAsync(getPropertyOwnerByIdUseCase.execute(Number(req.params.id)))
    if (error) return next(error);
    res.status(200).json(owner);
  }

  async approve(req: Request, res: Response, next: NextFunction) {
    const [error, owner] = await catchErrorAsync(approveOwnerProfileUseCase.execute(Number(req.params.id)))
    if (error) throw error
    res.status(200).json(owner)
  }

  async reject(req: Request, res: Response, next: NextFunction) {
    const [error, owner] = await catchErrorAsync(rejectOwnerProfileUseCase.execute(Number(req.params.id)))
    if (error) throw error
    res.status(200).json(owner)
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    const [error, owner] = await catchErrorAsync(deleteOwnerProfileUseCase.execute(Number(req.params.id)))
    if (error) throw error
    res.status(200).json({ message: `Owner profile is deleted successfully` })
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const authReq = req as AuthenticatedRequest;
      const userId = authReq.user?.id;

      if (!userId) {
        return next(AppError.new(errorKinds.notAuthorized, "User not authenticated"));
      }

      const existing = await prisma.ownerProfile.findFirst({
        where: {
          userId,
          status: "Approved"
        }
      })

      if (existing) {
        return next(AppError.new(errorKinds.alreadyExist, "Profile already existed"));
      }

      const { nrcNo, address } = req.body;

      const [error, result] = await catchErrorAsync(createPropertyOwnerUseCase.execute({ nrcNo, address, userId }));
      if (error) return next(error);

      res.status(200).json(result);
    } catch (error) {
      console.error("Error in ownerController.create:", error);
      next(error instanceof AppError
        ? error
        : AppError.new(errorKinds.internalServerError, "Unexpected error during owner creation")
      );
    }
  }

}

const ownerController = new OwnerController()
export default ownerController