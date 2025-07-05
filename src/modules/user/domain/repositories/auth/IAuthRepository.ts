import { User } from "../../entitiies/User.entity";

export interface IAuthRepository {
	findByEmail: (email: string) => Promise<User | null>;
}
