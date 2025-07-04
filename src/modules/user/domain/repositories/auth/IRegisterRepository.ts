import { Register } from "../../entitiies/auth/Register.entity";

export interface IRegisterRepository {
  create(data: any): Promise<Register>;
  findByEmail(email: string): Promise<Register | null>;
}
