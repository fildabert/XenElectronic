"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = __importDefault(require("./cart/cart.controller"));
const product_controller_1 = __importDefault(require("./product/product.controller"));
const router = express_1.default.Router();
router.use('/product', product_controller_1.default);
router.use('/cart', cart_controller_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map