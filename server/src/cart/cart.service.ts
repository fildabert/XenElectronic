import Xendit from 'xendit-node';
import { uuid } from 'uuidv4';
import AppError, { ErrorCode } from '../error';
import cartRepository from './cart.repository';
import { Cart, CartStatus, CreateCartPayload } from './cart.type';
import productRepository from '../product/product.repository';

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
    throw new AppError(ErrorCode.CART_NOT_FOUND);
  }
  return result;
};

const checkoutCart = async (username: string): Promise<string> => {
  const existingCart = await cartRepository.findCart(username);
  if (!existingCart) {
    throw new AppError(ErrorCode.CART_NOT_FOUND);
  }
  const updatedCart = await cartRepository.updateCartStatus({ username, status: CartStatus.DONE });
  if (!updatedCart) {
    throw new AppError(ErrorCode.INTERNAL_SERVER_ERROR);
  }
  const products = await productRepository.getProducts();

  const xendit = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY || '' });
  const { Invoice } = xendit;
  const i = new Invoice({});
  const totalAmount = updatedCart.items.reduce((total, currentValue) => {
    const product = products.find((p) => p.id === currentValue.productId);
    if (product) {
      return total + currentValue.quantity * product.price;
    }
    return total;
  }, 0);

  const xenditResponse = await i.createInvoice({
    externalID: uuid(),
    amount: totalAmount,
  }) as Record<string, string>;

  return xenditResponse.invoice_url;
};

const cartService = {
  upsertCart,
  getCart,
  checkoutCart,
};

export default cartService;
