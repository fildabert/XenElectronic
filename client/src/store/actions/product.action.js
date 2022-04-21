import axios from 'axios';
import { BASE_URL, EVENTS } from '../store.constant';

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: EVENTS.IS_LOADING, payload: true });
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/product`,
    });
    dispatch({ type: EVENTS.FETCH_PRODUCTS, payload: response.data.data });
    dispatch({ type: EVENTS.IS_LOADING, payload: false });
  };
};

export const selectCategory = (category) => {
  return (dispatch) => {
    dispatch({ type: EVENTS.SELECT_CATEGORY, payload: category });
  };
};
