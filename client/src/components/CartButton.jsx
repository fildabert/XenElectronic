import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart, updateCartToServer } from "../store/actions/cart.action";

export default function CartButton(props) {
  const dispatch = useDispatch();
  const [buttonToggle, setToggle] = useState(0);
  const { cart } = useSelector((state) => state)

  useEffect(() => {
    const delayBeforeDispatch = setTimeout(() => {
      if(buttonToggle > 0) {
        console.log('mantap', cart);
        dispatch(updateCartToServer(cart));
      }
    }, 1500);

    return () => clearTimeout(delayBeforeDispatch);
  }, [buttonToggle]);

  const incrementProduct = () => {
    setToggle(buttonToggle + 1);
    dispatch(addToCart(props.product.id));
  };

  const decrementProduct = () => {
    setToggle(buttonToggle + 1);
    dispatch(removeFromCart(props.product.id));
  };

  if (!props.cart) {
    return (<button onClick={incrementProduct}>Add to cart</button>)
  } 
  return (
    <div className="container-row justify-space-evenly">
      <button onClick={decrementProduct}>-</button>
      { props.cart.quantity }
      <button onClick={incrementProduct}>+</button>
    </div>
  )  
}