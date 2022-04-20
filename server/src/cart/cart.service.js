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
const error_1 = __importDefault(require("../error"));
const cart_repository_1 = __importDefault(require("./cart.repository"));
const createCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_repository_1.default.createCart(payload);
    return result;
});
const getCart = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_repository_1.default.findCart(username);
    if (!result) {
        throw new error_1.default(400, 'Cart not found');
    }
    return result;
});
const cartService = {
    createCart,
    getCart,
};
exports.default = cartService;
//# sourceMappingURL=cart.service.js.map