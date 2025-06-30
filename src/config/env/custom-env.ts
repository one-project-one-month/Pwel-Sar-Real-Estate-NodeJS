export const customEnvironment = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL,
} as const;

export type CustomEnvironmentType = typeof customEnvironment[keyof typeof customEnvironment]

export default customEnvironment;