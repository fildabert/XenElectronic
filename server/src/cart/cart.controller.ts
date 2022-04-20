import express from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse } from '../common.type';
import AppError from '../error';
import cartService from './cart.service';
import { Cart, CreateCartPayload, GetCartParams } from './cart.type';
import cartValidator from './cart.validator';

const cartController = express.Router();

cartController.post<{}, ApiResponse<Cart>, CreateCartPayload >('/', ...cartValidator.createCartValidator(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(400, 'Validation Errors', errors.array()));
    }
    const cart = await cartService.createCart(req.body);
    return res.status(201).json({ message: 'Cart created', data: cart });
  } catch (error) {
    return next(error);
  }
});

cartController.get<GetCartParams, ApiResponse<Cart>, CreateCartPayload >('/:username', ...cartValidator.getCartParams(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(400, 'Validation Errors', errors.array()));
    }
    const cart = await cartService.getCart(req.params.username);
    return res.status(201).json({ message: 'Cart fetched', data: cart });
  } catch (error) {
    return next(error);
  }
});

export default cartController;
