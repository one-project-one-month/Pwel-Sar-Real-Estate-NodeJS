export interface IUser {
	id: number;
	email: string;
	username?: string;
	roleId: number;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	// Add other user fields as needed
}
