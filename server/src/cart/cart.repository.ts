/* eslint-disable max-len */
import {
  Cart, CartStatus, CreateCartPayload, UpdateCartStatusPayload,
} from './cart.type';
import { CartDocument, CartModel } from './cart.model';

const convertDocumentToObject = (document: CartDocument) => document.toObject({ getters: true }) as Cart;

const findCart = async (username: string): Promise<Cart | null> => {
  const cart = await CartModel.findOne({ username, status: CartStatus.ACTIVE });
  return cart && convertDocumentToObject(cart);
};

const createCart = async (payload: CreateCartPayload) => {
  const result = await CartModel.create({
    username: payload.username,
    items: payload.items,
    status: CartStatus.ACTIVE,
  });

  return convertDocumentToObject(result);
};

const updateCart = async (payload: CreateCartPayload) => {
  const result = await CartModel.findOneAndUpdate(
    { username: payload.username, status: CartStatus.ACTIVE },
    { items: payload.items },
    { new: true },
  );
  if (result) {
    return convertDocumentToObject(result);
  }
  return null;
};

const updateCartStatus = async (payload: UpdateCartStatusPayload) => {
  await CartModel.updateOne({ username: payload.username, status: CartStatus.ACTIVE }, { status: payload.status });
};

const cartRepository = {
  createCart,
  findCart,
  updateCart,
  updateCartStatus,
};

export default cartRepository;
