import cartRepository from './cart.repository';
import { Cart, CreateCartPayload } from './cart.type';

const createCart = async (payload: CreateCartPayload): Promise<Cart> => {
  const result = await cartRepository.createCart(payload);

  return result;
};

const cartService = {
  createCart,
};

export default cartService;
