import { body, param } from 'express-validator';

const createCartValidator = () => [
  body('username').exists().withMessage('username required').isString()
    .withMessage('username must be a string'),
  body('items', 'items must be an array of items[]').isArray(),
  body('items.*.productId').exists().withMessage('items.productId required').isString()
    .withMessage('productId must be a string'),
  body('items.*.quantity').exists().withMessage('items.quantity required').isInt()
    .withMessage('quantity must be an int'),
];

const getCartParams = () => [
  param('username', 'username must be a string').isString().isLength({ min: 5 }),
];

const checkoutValidator = () => [
  body('username', 'username must be a string').isString(),
];

const cartValidator = {
  createCartValidator,
  getCartParams,
  checkoutValidator,
};
export default cartValidator;
