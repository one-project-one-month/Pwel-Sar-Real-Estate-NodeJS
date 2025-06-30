import customEnvironment, { CustomEnvironmentType } from './custom-env';

type ConfigKeys = keyof typeof customEnvironment;
type Configs = Record<ConfigKeys, string>;

class AppConfig {
    private static _instance: AppConfig;

    private static configs: Partial<Configs> = {};

    private constructor() {}

    private static getInstance(): AppConfig {
        if (!this._instance) {
            this._instance = new AppConfig();
        }
        return this._instance;
    }

    static register(configs: Configs): AppConfig {
        this.getInstance();

        Object.entries(configs).forEach(([key, value]) => {
            if (!value) {
                throw new Error(`value of ${key} cannot be null`);
            }
            this.configs[key as ConfigKeys] = value;
        });

        return this;
    }

    static getConfig<K extends ConfigKeys>(key: K): string {
        if (key === undefined || !(key in this.configs)) {
            throw new Error(`Invalid config key: ${key}`);
        }
        return this.configs[key] as string;
    }
}

// Register configuration
AppConfig.register(
    Object.fromEntries(
        Object.entries(customEnvironment).map(([key, value]) => [key, value !== undefined ? String(value) : value])
    ) as Configs
);

export default AppConfig;