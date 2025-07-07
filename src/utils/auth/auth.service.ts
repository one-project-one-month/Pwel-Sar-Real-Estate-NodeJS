import { signAccessToken, signRefreshToken } from "./jwt";
import { IUser } from "./IUser";

export const generateTokens = (user: IUser) => {
	const accessToken = signAccessToken(user.email);
	const refreshToken = signRefreshToken(user.email);
	// console.log(accessToken);
	return { accessToken, refreshToken };
};

export const generateAccessToken = (user: IUser) => signAccessToken(user);
