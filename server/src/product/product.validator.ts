import { body } from 'express-validator';

const createProductValidator = () => [
  body('name').exists().withMessage('name required').isString()
    .withMessage('name must be a string'),
  body('price').exists().withMessage('price required').isInt()
    .withMessage('price must be an int'),
  body('category').exists().withMessage('category required').isString()
    .withMessage('category must be a string'),
  body('imageUrl').exists().withMessage('imageUrl required').isString()
    .withMessage('imageUrl must be a string'),
];

const productValidators = {
  createProductValidator,
};
export default productValidators;
