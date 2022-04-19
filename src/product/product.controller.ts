import express from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse } from '../common.type';
import AppError from '../error';
import productService from './product.service';
import { Product } from './product.type';
import productValidators from './product.validator';

const productController = express.Router();

productController.post<{}, ApiResponse<any>, Product >('/', ...productValidators.createProductValidator(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(400, 'Validation Errors', errors.array()));
    }
    const product = await productService.createProduct(req.body);
    return res.status(201).json({ message: 'Product created', data: product });
  } catch (error) {
    return next(error);
  }
});

productController.get<{}, ApiResponse<Product[]>>('/', async (req, res) => {
  const products = await productService.getProducts();

  return res.status(200).json({ message: 'Products fetched', data: products });
});

export default productController;
