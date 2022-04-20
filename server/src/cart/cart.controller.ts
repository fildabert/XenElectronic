import express from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse } from '../common.type';
import AppError, { ErrorCode } from '../error';
import cartService from './cart.service';
import { Cart, CreateCartPayload, GetCartParams } from './cart.type';
import cartValidator from './cart.validator';

const cartController = express.Router();

cartController.post<{}, ApiResponse<Cart>, CreateCartPayload >('/', ...cartValidator.createCartValidator(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(ErrorCode.VALIDATION_ERRORS, errors.array()));
    }
    const cart = await cartService.upsertCart(req.body);
    return res.status(201).json({ message: 'Cart upserted', data: cart });
  } catch (error) {
    return next(error);
  }
});

cartController.get<GetCartParams, ApiResponse<Cart>>('/:username', ...cartValidator.getCartParams(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(ErrorCode.VALIDATION_ERRORS, errors.array()));
    }
    const cart = await cartService.getCart(req.params.username);
    return res.status(200).json({ message: 'Cart fetched', data: cart });
  } catch (error) {
    return next(error);
  }
});

cartController.post<{}, ApiResponse<string>, CreateCartPayload >('/checkout', ...cartValidator.checkoutValidator(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(ErrorCode.VALIDATION_ERRORS, errors.array()));
    }
    const paymentUrl = await cartService.checkoutCart(req.body.username);
    return res.status(201).json({ message: 'Cart checkout successful', data: paymentUrl });
  } catch (error) {
    return next(error);
  }
});

export default cartController;
