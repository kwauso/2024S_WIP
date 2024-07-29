"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const userAPI_1 = __importDefault(require("./routes/userAPI"));
const app = (0, express_1.default)();
app.use(express_1.default.static('/home/akira/did_server/public'));
app.use(cors());
app.use('/api', userAPI_1.default);
app.get("/", (req, res) => {
    res.send();
});
app.listen(3000, () => {
    console.log('ポート3000番で起動しました');
});
