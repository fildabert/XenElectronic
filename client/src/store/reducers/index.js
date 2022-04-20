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
  console.log(state);
  cart.items = cart.items.map((item) => {
    const product = state.products.find(
      (product) => product.id === item.productId
    );
    return { ...item, product };
  });
  console.log(cart);
  return { ...state, cart };
};

const mapUpdateCartToServerToState = (state) => {
  return { ...state };
};

const mapCheckoutCartToState = (state) => {
  return {
    ...state,
    cart: {
      username: 'mockUsername',
      items: [],
      status: '',
    },
  };
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'fetchProducts':
      const productCategoryMap = action.payload.reduce(
        (map, product) => {
          const { category } = product;
          if (map[category]) {
            map[category].push(product);
          } else {
            map[category] = [product];
          }
          return map;
        },
        { None: action.payload }
      );
      return { ...state, products: action.payload, productCategoryMap };

    case 'selectCategory':
      return { ...state, products: state.productCategoryMap[action.payload] };

    case 'addToCart':
      return mapAddToCartToState(state, action.payload);
    case 'removeFromCart':
      return mapRemoveFromCartToState(state, action.payload);
    case 'fetchCart':
      return mapFetchCartToState(state, action.payload);
    case 'updateCartToServer':
      return mapUpdateCartToServerToState(state);
    case 'checkoutCart':
      return mapCheckoutCartToState(state);
    default:
      return state;
  }
}

export default reducer;
