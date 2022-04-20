"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const error_1 = __importDefault(require("./error"));
const port = 3030;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/', routes_1.default);
app.use((err, _req, res, _next) => {
    let error = err;
    if (!error.errorCode) {
        error = new error_1.default(500, 'Internal Server Error');
    }
    res.status(error.errorCode).json({ message: error.message, data: error.data });
});
app.get('/ping', (req, res) => {
    res.status(200).json({ data: 'pong' });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect('mongodb://localhost:27017/xendit');
    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
});
start();
//# sourceMappingURL=server.js.map