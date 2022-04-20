import axios from 'axios';

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:3030/product',
    });
    dispatch(setProducts(response.data));
  };
};

export const setProducts = (payload) => {
  return (dispatch) => {
    dispatch({ type: 'fetchProducts', payload: payload.data });
  };
};

export const selectCategory = (category) => {
  return (dispatch) => {
    dispatch({ type: 'selectCategory', payload: category });
  };
};
