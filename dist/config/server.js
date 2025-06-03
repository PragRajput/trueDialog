"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const smsRoutes_1 = __importDefault(require("../module/routes/smsRoutes"));
const statusRoutes_1 = __importDefault(require("../module/routes/statusRoutes"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3000', 10);
app.use(express_1.default.json());
app.use('/', statusRoutes_1.default);
app.use(smsRoutes_1.default);
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
