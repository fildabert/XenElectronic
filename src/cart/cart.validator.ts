import { body } from 'express-validator';

const createCartValidator = () => [
  body('userId').exists().withMessage('userId required').isString()
    .withMessage('userId must be a string'),
  body('items', 'items must be an array of items[]').isArray({ min: 1 }),
  body('items.*.productId').exists().withMessage('items.productId required').isString()
    .withMessage('productId must be a string'),
  body('items.*.quantity').exists().withMessage('items.quantity required').isInt()
    .withMessage('quantity must be an int'),

];

const cartValidator = {
  createCartValidator,
};
export default cartValidator;
