import axios from 'axios';
import Swal from 'sweetalert2';
import errorHandler from '../../helpers/errorHandler';
import { BASE_URL, EVENTS } from '../store.constant';

export const addToCart = (productId) => {
  return (dispatch) => {
    dispatch({ type: EVENTS.ADD_TO_CART, payload: productId });
  };
};

export const removeFromCart = (productId) => {
  return (dispatch) => {
    dispatch({ type: EVENTS.REMOVE_FROM_CART, payload: productId });
  };
};

export const fetchCart = () => {
  return async (dispatch) => {
    dispatch({ type: EVENTS.IS_LOADING, payload: true });
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${BASE_URL}/cart/mockUsername`,
        });
        cart = response.data.data;
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {}
    }
    dispatch({ type: EVENTS.IS_LOADING, payload: false });
    dispatch({ type: EVENTS.FETCH_CART, payload: cart });
  };
};

export const updateCartToServer = (cart) => {
  return async (dispatch) => {
    const itemPayload = cart.items.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
      };
    });
    try {
      await axios({
        url: `${BASE_URL}/cart`,
        method: 'POST',
        data: {
          username: 'mockUsername',
          items: itemPayload,
        },
      });
    } catch (error) {
      errorHandler(error);
    }
    dispatch({ type: EVENTS.UPDATE_CART_TO_SERVER, payload: '' });
  };
};

export const checkoutCart = (username) => {
  return async (dispatch) => {
    dispatch({ type: EVENTS.IS_LOADING, payload: true });
    try {
      const response = await axios({
        method: 'POST',
        url: `${BASE_URL}/cart/checkout`,
        data: {
          username,
        },
      });

      Swal.fire({
        title: 'Continue Payment',
        text: 'You will be redirected to a new website, please complete your payment there',
      });
      setTimeout(() => {
        window.open(response.data.data, '_blank');
      }, 2000);
      dispatch({ type: EVENTS.CHECKOUT_CART });
    } catch (error) {
      errorHandler(error);
    }
    dispatch({ type: EVENTS.IS_LOADING, payload: false });
  };
};
