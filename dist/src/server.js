"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env/dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("routes"));
const app_config_1 = __importDefault(require("config/env/app-config"));
const app = (0, express_1.default)();
const port = app_config_1.default.getConfig("PORT");
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use('/api', routes_1.default);
app.listen(port, () => console.log(`Server is running on port ${port}`));
