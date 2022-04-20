import axios from 'axios';
import { BASE_URL } from '../store.constant';

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/product`,
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
