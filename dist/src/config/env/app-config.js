"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_env_1 = __importDefault(require("./custom-env"));
class AppConfig {
    constructor() { }
    static getInstance() {
        if (!this._instance) {
            this._instance = new AppConfig();
        }
        return this._instance;
    }
    static register(configs) {
        this.getInstance();
        Object.entries(configs).forEach(([key, value]) => {
            if (!value) {
                throw new Error(`value of ${key} cannot be null`);
            }
            this.configs[key] = value;
        });
        return this;
    }
    static getConfig(key) {
        if (key === undefined || !(key in this.configs)) {
            throw new Error(`Invalid config key: ${key}`);
        }
        return this.configs[key];
    }
}
AppConfig.configs = {};
// Register configuration
AppConfig.register(Object.fromEntries(Object.entries(custom_env_1.default).map(([key, value]) => [key, value !== undefined ? String(value) : value])));
exports.default = AppConfig;
