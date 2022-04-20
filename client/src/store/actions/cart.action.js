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
  return (dispatch) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    dispatch({ type: 'fetchCart', payload: cart });
  };
};

export const updateCartToServer = (cart) => {
  return async (dispatch) => {
    console.log(cart);
  };
};
