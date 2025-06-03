"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendProgress_1 = require("../../utils/sendProgress");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('✅ Azure Event Hub Test Server is running.');
});
router.get('/status-stream', (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    });
    res.flushHeaders();
    const intervalId = setInterval(() => {
        res.write(`data: ${JSON.stringify(sendProgress_1.sendProgress)}\n\n`);
    }, 500);
    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
});
exports.default = router;
