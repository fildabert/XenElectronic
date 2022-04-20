import axios from 'axios';
import Swal from 'sweetalert2';
import errorHandler from '../../helpers/errorHandler';
import { BASE_URL } from '../store.constant';

export const addToCart = (productId) => {
  return (dispatch) => {
    dispatch({ type: 'addToCart', payload: productId });
  };
};

export const removeFromCart = (productId) => {
  return (dispatch) => {
    dispatch({ type: 'removeFromCart', payload: productId });
  };
};

export const fetchCart = () => {
  return async (dispatch) => {
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
    dispatch({ type: 'fetchCart', payload: cart });
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
    dispatch({ type: 'updateCartToServer', payload: '' });
  };
};

export const checkoutCart = (username) => {
  return async (dispatch) => {
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
      dispatch({ type: 'checkoutCart' });
    } catch (error) {
      errorHandler(error);
    }
  };
};
