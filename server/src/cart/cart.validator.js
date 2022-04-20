"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const createCartValidator = () => [
    (0, express_validator_1.body)('username').exists().withMessage('username required').isString()
        .withMessage('username must be a string'),
    (0, express_validator_1.body)('items', 'items must be an array of items[]').isArray({ min: 1 }),
    (0, express_validator_1.body)('items.*.productId').exists().withMessage('items.productId required').isString()
        .withMessage('productId must be a string'),
    (0, express_validator_1.body)('items.*.quantity').exists().withMessage('items.quantity required').isInt()
        .withMessage('quantity must be an int'),
];
const getCartParams = () => [
    (0, express_validator_1.param)('username', 'username must be a string').isString(),
];
const cartValidator = {
    createCartValidator,
    getCartParams,
};
exports.default = cartValidator;
//# sourceMappingURL=cart.validator.js.map