/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
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

interface UpdateCartPayload extends CreateCartPayload {}

interface CheckoutPayload {
  username: string;
}

interface UpdateCartStatusPayload {
  username: string;
  status: CartStatus;
}

interface GetCartParams {
  username: string;
}
interface Item extends ProductPayload {}

interface Cart {
  username: string;
  items: Item[];
  status: CartStatus;
}

export {
  Cart,
  CartStatus,
  CreateCartPayload,
  GetCartParams,
  UpdateCartStatusPayload,
  UpdateCartPayload,
};
