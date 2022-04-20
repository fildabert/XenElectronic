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
const express_validator_1 = require("express-validator");
const error_1 = __importDefault(require("../error"));
const cart_service_1 = __importDefault(require("./cart.service"));
const cart_validator_1 = __importDefault(require("./cart.validator"));
const cartController = express_1.default.Router();
cartController.post('/', ...cart_validator_1.default.createCartValidator(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(new error_1.default(400, 'Validation Errors', errors.array()));
        }
        const cart = yield cart_service_1.default.createCart(req.body);
        return res.status(201).json({ message: 'Cart created', data: cart });
    }
    catch (error) {
        return next(error);
    }
}));
cartController.get('/:username', ...cart_validator_1.default.getCartParams(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(new error_1.default(400, 'Validation Errors', errors.array()));
        }
        const cart = yield cart_service_1.default.getCart(req.params.username);
        return res.status(201).json({ message: 'Cart fetched', data: cart });
    }
    catch (error) {
        return next(error);
    }
}));
exports.default = cartController;
//# sourceMappingURL=cart.controller.js.map