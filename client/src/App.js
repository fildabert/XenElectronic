import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import ProductScreen from './screens/ProductScreen';
import NavBar from './components/NavBar';
import CartScreen from './screens/CartScreen';
import { useDispatch } from 'react-redux';
import { fetchCart } from './store/actions/cart.action';
import { fetchProducts } from './store/actions/product.action';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()).then(() => {
      dispatch(fetchCart());
    });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />
      </Routes>
    </div>
  );
}

export default App;
