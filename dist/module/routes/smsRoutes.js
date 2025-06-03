"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const smsController_1 = __importDefault(require("../controllers/smsController"));
const router = express_1.default.Router();
router.post('/send', smsController_1.default.sendSingle);
router.post('/send-bulk', smsController_1.default.sendBulk);
exports.default = router;
