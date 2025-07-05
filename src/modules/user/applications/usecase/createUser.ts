import { User } from "modules/user/domain/entitiies/User.entity";
import { UserRepository } from "modules/user/infrastructures/repositories/UserRepository";


export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {
    static execute(arg0: { username: any; email: any; password: any; }) {
        throw new Error("Method not implemented.");
    }
    constructor(private userRepository: UserRepository) {}

    async execute(data: CreateUserDTO): Promise<User | null> {
        // Check if user already exists
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password (implement your own hashing logic or use a service)
        const hashedPassword = await this.hashPassword(data.password);

        const user = new User({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);

        return user;
    }

    private async hashPassword(password: string): Promise<string> {
        // Replace with actual hashing logic, e.g., bcrypt
        return password; // Placeholder
    }
}