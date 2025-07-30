import customEnvironment from './custom-env';

type ConfigKeys = keyof typeof customEnvironment;
type Configs = Record<ConfigKeys, string>;

class AppConfig {
  private static _instance: AppConfig;

  private static configs: Partial<Configs> = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getConfig<K extends ConfigKeys>(key: K): string {
    if (key === undefined || !(key in this.configs)) {
      throw new Error(`Invalid config key: ${key}`);
    }
    return this.configs[key]!;
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

  private static getInstance(): AppConfig {
    if (!this._instance) {
      this._instance = new AppConfig();
    }
    return this._instance;
  }
}

// Register configuration
AppConfig.register(
  Object.fromEntries(
    Object.entries(customEnvironment).map(([key, value]) => [
      key,
      value !== undefined ? String(value) : value,
    ])
  ) as Configs
);

export default AppConfig;
