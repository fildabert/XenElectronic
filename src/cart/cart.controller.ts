import express from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse } from '../common.type';
import AppError from '../error';
import cartService from './cart.service';
import { CreateCartPayload } from './cart.type';
import cartValidator from './cart.validator';

const cartController = express.Router();

cartController.post<{}, ApiResponse<any>, CreateCartPayload >('/', ...cartValidator.createCartValidator(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(400, 'Validation Errors', errors.array()));
    }
    const product = await cartService.createCart(req.body);
    return res.status(201).json({ message: 'Product created', data: product });
  } catch (error) {
    return next(error);
  }
});

export default cartController;
