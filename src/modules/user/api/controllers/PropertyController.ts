import { NextFunction, Request, Response } from "express";
import { CreatePropertyOwnerUseCase, GetOwnerListUseCase, GetPropertyOwnerByIdUseCase } from "modules/user/applications/usecase/GetOwnerListUseCase";
import { PropertyOwnerRepository } from "modules/user/infrastructures/repositories/OwnerRepository";
import { catchErrorAsync } from "utils/error-handling/CatchError";
import { GetOwnerListParamType } from "../params/getOwnerListParam";
import { AppError, errorKinds } from "utils/error-handling/AppError";


  

const getPropertyOwnerList = new GetOwnerListUseCase(new PropertyOwnerRepository())
const getPropertyOwnerByIdUseCase = new GetPropertyOwnerByIdUseCase(new PropertyOwnerRepository())
const createPropertyOwnerUseCase = new CreatePropertyOwnerUseCase(new PropertyOwnerRepository())

class OwnerController {
    async getAll(req:Request, res:Response, next:NextFunction){
        // const [owners, error] = await catchErrorAsync(getPropertyOwnerList.execute({}))
        // if (error) return next(error);
        // res.status(200).json(owners);

       try {
         const {page, limit, search, searchBy} = req.query
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
    async findById(req:Request, res:Response, next:NextFunction){
        const [owner, error] = await catchErrorAsync(getPropertyOwnerByIdUseCase.execute(Number(req.params.id)))
        if (error) return next(error);
        res.status(200).json(owner);
    }

    async create(req:Request, res:Response, next:NextFunction){
        const [owner, error] = await catchErrorAsync(createPropertyOwnerUseCase.execute(req.body))
        if (error) return next(error);
        res.status(200).json(owner);
    }
      
}

const ownerController = new OwnerController()
export default ownerController