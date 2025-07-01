class UserDTO {
    id: number;
    username: string;
    email: string;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;


    constructor(user: any) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.roleId = user.roleId;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }   
}