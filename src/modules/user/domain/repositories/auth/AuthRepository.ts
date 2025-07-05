import { Register } from "../../entitiies/auth/Register.entity";
import { User } from "../../entitiies/User.entity";

export interface IAuthRepository {
	findByEmail: (email: string) => Promise<User | null>;
}

export interface IRegisterRepository {
	create(data: any): Promise<Register>;
	findByEmail(email: string): Promise<Register | null>;
}
