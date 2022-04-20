import AppError from '../error';
import cartRepository from './cart.repository';
import { Cart, CartStatus, CreateCartPayload } from './cart.type';

// eslint-disable-next-line consistent-return
const upsertCart = async (payload: CreateCartPayload): Promise<Cart | undefined> => {
  const existingCart = await cartRepository.findCart(payload.username);
  if (!existingCart) {
    return cartRepository.createCart(payload);
  }

  await cartRepository.updateCart(payload);
};

const getCart = async (username: string): Promise<Cart> => {
  const result = await cartRepository.findCart(username);
  if (!result) {
    throw new AppError(400, 'Cart not found');
  }
  return result;
};

const checkoutCart = async (username: string): Promise<void> => {
  const existingCart = await cartRepository.findCart(username);
  if (!existingCart) {
    throw new AppError(400, 'Cart not found');
  }
  await cartRepository.updateCartStatus({ username, status: CartStatus.DONE });
};

const cartService = {
  upsertCart,
  getCart,
  checkoutCart,
};

export default cartService;
