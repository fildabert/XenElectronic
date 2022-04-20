import AppError from '../error';
import cartRepository from './cart.repository';
import { Cart, CreateCartPayload } from './cart.type';

const createCart = async (payload: CreateCartPayload): Promise<Cart> => {
  const result = await cartRepository.createCart(payload);

  return result;
};

const getCart = async (username: string): Promise<Cart> => {
  const result = await cartRepository.findCart(username);
  if (!result) {
    throw new AppError(400, 'Cart not found');
  }
  return result;
};

const cartService = {
  createCart,
  getCart,
};

export default cartService;
