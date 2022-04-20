export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3030/product', {
      method: 'GET',
    });

    const products = await response.json();
    console.log(products);
    dispatch(setProducts(products));
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
