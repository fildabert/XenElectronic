import { Cart, CartStatus, CreateCartPayload, UpdateCartPayload } from '../../cart.type';

const cartPayload: CreateCartPayload = {
  username: 'username',
  items: [
    { productId: 'productId', quantity: 2 },
  ],
};

const updateCartPayload: UpdateCartPayload = {
  ...cartPayload,
  items: [
    { productId: 'productId', quantity: 5 },
  ],
};

const mockActiveCart: Cart = {
  ...cartPayload,
  status: CartStatus.ACTIVE,
};

const mockCheckoutCart: Cart = {
  ...cartPayload,
  items: [
    { productId: 'productId', quantity: 5 },
    { productId: 'productId2', quantity: 5 },
  ],
  status: CartStatus.ACTIVE,
};

const cartData = {
  cartPayload,
  updateCartPayload,
  mockActiveCart,
  mockCheckoutCart,
};

export default cartData;
