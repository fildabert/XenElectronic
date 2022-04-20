/* eslint-disable max-len */
import { Cart, CartStatus, CreateCartPayload } from './cart.type';
import { CartDocument, CartModel } from './cart.model';
import AppError from '../error';

const convertDocumentToObject = (document: CartDocument) => document.toObject({ getters: true }) as Cart;

const findCart = async (username: string): Promise<Cart | null> => {
  const cart = await CartModel.findOne({ username, status: CartStatus.ACTIVE });
  return cart && convertDocumentToObject(cart);
};

const createCart = async (payload: CreateCartPayload) => {
  const existingCart = await findCart(payload.username);
  if (existingCart) {
    throw new AppError(400, 'There is already an existing active cart for this user');
  }

  const result = await CartModel.create({
    username: payload.username,
    items: payload.items,
    status: CartStatus.ACTIVE,
  });

  return convertDocumentToObject(result);
};

const cartRepository = {
  createCart,
  findCart,
};

export default cartRepository;
