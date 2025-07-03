
type RegisterEntity = {
    id: number;
    username: string;
    email: string;
    password: string;
    roleId: number;
};

export class Register {
    id: number;
    username: string;
    email: string;
    password: string;
    roleId: number;

    constructor({
        id,
        username,
        email,
        password,
        roleId,
    }: RegisterEntity) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roleId = roleId;
    }
}