"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const createProductValidator = () => [
    (0, express_validator_1.body)('name').exists().withMessage('name required').isString()
        .withMessage('name must be a string'),
    (0, express_validator_1.body)('price').exists().withMessage('price required').isInt()
        .withMessage('price must be an int'),
    (0, express_validator_1.body)('category').exists().withMessage('category required').isString()
        .withMessage('category must be a string'),
    (0, express_validator_1.body)('imageUrl').exists().withMessage('imageUrl required').isString()
        .withMessage('imageUrl must be a string'),
];
const productValidators = {
    createProductValidator,
};
exports.default = productValidators;
//# sourceMappingURL=product.validator.js.map