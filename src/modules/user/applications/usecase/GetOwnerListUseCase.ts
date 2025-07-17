import { GetOwnerListParamType } from "modules/user/api/params/getOwnerListParam";
import { GetAllOwnerRequestType, IPropertyOwnerRepository } from "modules/user/domain/repositories/IOwnerRepository";
import { catchErrorAsync } from "utils/error-handling/CatchError";
import Pagination from "utils/pagination/Pagination";
import { OwnerDTO } from "../dtos/OwnerDTO";


interface IPropertyOwnerCase {
    execute(param: any): Promise<OwnerDTO>
}

export class GetOwnerListUseCase {
    constructor(private readonly OwnerRepo: IPropertyOwnerRepository) { }
    async execute(params: GetOwnerListParamType): Promise<Pagination<OwnerDTO[]>> {
        const pageNum = params.page || 0;
        const limitNum = params.limit || 20;

        const [error, results] = await catchErrorAsync(this.OwnerRepo.getAll({
            searchBy: params.searchBy as GetAllOwnerRequestType['searchBy'],
            searchKeyword: params.search ?? "",
            page: pageNum,
            limit: limitNum,
        }))

        if (error) {
            throw error
        }

        const ownerLists = results.owners.map(user => new OwnerDTO(user));
        const paginationResult = Pagination.new(pageNum, limitNum, results.totalCount, ownerLists).getResult();
        return paginationResult;
    }
}

export class GetPropertyOwnerByIdUseCase implements IPropertyOwnerCase {
    constructor(private readonly OwnerRepo: IPropertyOwnerRepository) { }

    async execute(id: number): Promise<OwnerDTO> {
        const [error, owner] = await catchErrorAsync(this.OwnerRepo.findById(id))
        if (error) throw error;
        return new OwnerDTO(owner)
    }
}

export class CreatePropertyOwnerUseCase implements IPropertyOwnerCase {
    constructor(private readonly OwnerRepo: IPropertyOwnerRepository) { }

    async execute(param: any): Promise<OwnerDTO> {
        console.log("Received param for creation:", param);



        const createData = {
            nrcNo: param.nrcNo,
            address: param.address,
            userId: param.userId
        };

        const [error, owner] = await catchErrorAsync(this.OwnerRepo.create(createData));
        if (error) throw error;
        return new OwnerDTO(owner);
    }
}

export class ApproveOwnerProfileUseCase implements IPropertyOwnerCase {
    constructor(private readonly OwnerRepo: IPropertyOwnerRepository) { }

    async execute(id: number): Promise<OwnerDTO> {
        const [error, owner] = await catchErrorAsync(this.OwnerRepo.approve(id))
        if (error) throw error
        return new OwnerDTO(owner)
    }
}

export class RejectOwnerProfileUseCase implements IPropertyOwnerCase {
    constructor(private readonly OwnerRepo: IPropertyOwnerRepository) { }

    async execute(id: number): Promise<OwnerDTO> {
        const [error, owner] = await catchErrorAsync(this.OwnerRepo.reject(id))
        if (error) throw error
        return new OwnerDTO(owner)
    }
}

export class DeleteOwnerProfileUseCase implements IPropertyOwnerCase {
    constructor(private readonly OwnerRepo: IPropertyOwnerRepository) { }

    async execute(id: number): Promise<OwnerDTO> {
        const [error, owner] = await catchErrorAsync(this.OwnerRepo.deleteById(id))
        if (error) throw error
        return new OwnerDTO(owner)
    }
}

