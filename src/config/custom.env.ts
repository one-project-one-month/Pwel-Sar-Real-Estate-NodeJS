const ENV = {
	PORT: process.env.PORT || 3000,
	JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
	ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY,
	ACCESS_TOKEN_PUBLIC_KEY: process.env.ACCESS_TOKEN_PUBLIC_KEY,
	REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY,
	REFRESH_TOKEN_PUBLIC_KEY: process.env.REFRESH_TOKEN_PUBLIC_KEY,
	DATABASE_URL:
		process.env.DATABASE_URL ||
		"postgres://user:password@localhost:5432/mydb",
} as const;

export type configType = (typeof ENV)[keyof typeof ENV];

export default ENV;
