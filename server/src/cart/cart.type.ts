/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import { Product } from '../product/product.type';

enum CartStatus {
  ACTIVE = 'ACTIVE',
  DONE = 'DONE'
}

interface ProductPayload {
  productId: string;
  quantity: number;
}
interface CreateCartPayload {
  username: string;
  items: ProductPayload[];
}

interface GetCartParams {
  username: string;
}
interface Item extends Product{
  quantity: number;
}

interface Cart {
  username: string;
  items: Item[];
}

export {
  Cart,
  CartStatus,
  CreateCartPayload,
  GetCartParams,
};
