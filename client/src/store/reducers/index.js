import { EVENTS } from '../store.constant';

const initialState = {
  products: [],
  productCategoryMap: {},
  cart: {
    username: 'mockUsername',
    items: [],
    status: '',
  },
  username: 'mockUsername',
  isLoading: false,
};

const mapFetchProductsToState = (state, products) => {
  const productCategoryMap = products.reduce(
    (map, product) => {
      const { category } = product;
      if (map[category]) {
        map[category].push(product);
      } else {
        map[category] = [product];
      }
      return map;
    },
    { None: products }
  );
  return { ...state, products: products, productCategoryMap };
};

const mapSelectCategoryToState = (state, category) => {
  return { ...state, products: state.productCategoryMap[category] };
};

const mapAddToCartToState = (state, productId) => {
  const foundInCart = state.cart.items.findIndex(
    (item) => item.productId === productId
  );
  if (foundInCart !== -1) {
    let productInCart = state.cart.items[foundInCart];
    productInCart = {
      ...productInCart,
      quantity: productInCart.quantity + 1,
    };
    state.cart.items[foundInCart] = productInCart;
  } else {
    const product = state.products.find((product) => product.id === productId);
    state.cart.items.push({
      productId: productId,
      product: product,
      quantity: 1,
    });
  }
  localStorage.setItem('cart', JSON.stringify(state.cart));
  return { ...state };
};

const mapRemoveFromCartToState = (state, productId) => {
  const foundInCart = state.cart.items.findIndex(
    (item) => item.productId === productId
  );
  if (foundInCart !== -1) {
    let productInCart = state.cart.items[foundInCart];
    productInCart = {
      ...productInCart,
      quantity: productInCart.quantity - 1,
    };

    if (productInCart.quantity <= 0) {
      state.cart.items.splice(foundInCart, 1);
    } else {
      state.cart.items[foundInCart] = productInCart;
    }
  }
  localStorage.setItem('cart', JSON.stringify(state.cart));
  return { ...state };
};

const mapFetchCartToState = (state, cart) => {
  if (!cart) {
    return { ...state };
  }
  cart.items = cart.items.map((item) => {
    const product = state.products.find(
      (product) => product.id === item.productId
    );
    return { ...item, product };
  });
  return { ...state, cart };
};

const mapUpdateCartToServerToState = (state) => {
  return { ...state };
};

const mapCheckoutCartToState = (state) => {
  localStorage.removeItem('cart');
  return {
    ...state,
    cart: {
      username: 'mockUsername',
      items: [],
      status: '',
    },
  };
};

const mapIsLoadingToState = (state, loading) => {
  return { ...state, isLoading: loading };
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS.FETCH_PRODUCTS:
      return mapFetchProductsToState(state, action.payload);
    case EVENTS.SELECT_CATEGORY:
      return mapSelectCategoryToState(state, action.payload);
    case EVENTS.ADD_TO_CART:
      return mapAddToCartToState(state, action.payload);
    case EVENTS.REMOVE_FROM_CART:
      return mapRemoveFromCartToState(state, action.payload);
    case EVENTS.FETCH_CART:
      return mapFetchCartToState(state, action.payload);
    case EVENTS.UPDATE_CART_TO_SERVER:
      return mapUpdateCartToServerToState(state);
    case EVENTS.CHECKOUT_CART:
      return mapCheckoutCartToState(state);
    case EVENTS.IS_LOADING:
      return mapIsLoadingToState(state, action.payload);
    default:
      return state;
  }
}

export default reducer;
