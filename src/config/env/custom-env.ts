export const customEnvironment = {
  ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT ?? 3000,
  REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY: process.env.REFRESH_TOKEN_PUBLIC_KEY,
} as const;

export type CustomEnvironmentType =
  (typeof customEnvironment)[keyof typeof customEnvironment];

export default customEnvironment;
