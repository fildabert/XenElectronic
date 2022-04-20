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
/* eslint-disable max-len */
const cart_type_1 = require("./cart.type");
const cart_model_1 = require("./cart.model");
const error_1 = __importDefault(require("../error"));
const convertDocumentToObject = (document) => document.toObject({ getters: true });
const findCart = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.CartModel.findOne({ username, status: cart_type_1.CartStatus.ACTIVE });
    return cart && convertDocumentToObject(cart);
});
const createCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCart = yield findCart(payload.username);
    if (existingCart) {
        throw new error_1.default(400, 'There is already an existing active cart for this user');
    }
    const result = yield cart_model_1.CartModel.create({
        username: payload.username,
        items: payload.items,
        status: cart_type_1.CartStatus.ACTIVE,
    });
    return convertDocumentToObject(result);
});
const cartRepository = {
    createCart,
    findCart,
};
exports.default = cartRepository;
//# sourceMappingURL=cart.repository.js.map