import axios from 'axios';
import Swal from 'sweetalert2';
import errorHandler from '../../helpers/errorHandler';

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
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:3030/cart/mockUsername',
      });
      cart = response.data.data;
      localStorage.setItem('cart', JSON.stringify(cart));
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
        url: 'http://localhost:3030/cart',
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
        url: 'http://localhost:3030/cart/checkout',
        data: {
          username,
        },
      });

      dispatch({ type: 'checkoutCart' });
    } catch (error) {
      errorHandler(error);
    }
  };
};
