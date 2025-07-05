export class LoginDTO {
	email: string;
	password: string;
	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}

export class LoginResponseDTO {
	id: number;
	username: string;
	email: string;
	roleId: number;
	createdAt: Date;
	updatedAt: Date;
	token: string;
	constructor(user: any, token: string) {
		this.id = user.id;
		this.username = user.username;
		this.email = user.email;
		this.roleId = user.roleId;
		this.createdAt = user.createdAt;
		this.updatedAt = user.updatedAt;
		this.token = token;
	}
}
