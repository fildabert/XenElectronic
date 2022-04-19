/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import { Product } from '../product/product.type';

enum CartStatus {
  ACTIVE = 'ACTIVE',
  DONE = 'DONE'
}

interface Item extends Product{
  quantity: number
}

interface Cart {
  userId: string,
  items: Item[]
}

export {
  Cart,
  CartStatus,
};
