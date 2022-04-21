const BASE_URL = 'https://xenelectronic-filbert.herokuapp.com';
// const BASE_URL = 'http://localhost:3030';

const EVENTS = {
  IS_LOADING: 'IS_LOADING',
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  SELECT_CATEGORY: 'SELECT_CATEGORY',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  FETCH_CART: 'FETCH_CART',
  UPDATE_CART_TO_SERVER: 'UPDATE_CART_TO_SERVER',
  CHECKOUT_CART: 'CHECKOUT_CART',
};
export { BASE_URL, EVENTS };