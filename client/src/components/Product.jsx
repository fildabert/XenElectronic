import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addToCart, removeFromCart } from "../store/actions/cart.action";

export default function Product(props) {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(addToCart());
  // }, [])

  const { cart } = useSelector((state) => state)

  const incrementProduct = () => {
    dispatch(addToCart(props.product.id))
  }

  const decrementProduct = () => {
    dispatch(removeFromCart(props.product.id))
  }

  const buildProductAction = () => {
    const productInCart = cart.items.find(item => item.productId === props.product.id);
    if (!productInCart) {
      return (<button onClick={incrementProduct}>Add to cart</button>)
    } 
    return (
      <div className="container-row justify-space-evenly">
        <button onClick={decrementProduct}>-</button>
        { productInCart.quantity }
        <button onClick={incrementProduct}>+</button>
      </div>
    )  
  }


  return (
    <>
      <div className="container-column align-center product-card">
        <div className="content-padding">
          <img src={props.product.imageUrl} alt="" />

          <div className="container-column">
            <p>{props.product.name}</p> 
            <p>Rp {props.product.price}</p>
            { buildProductAction() }
          </div>

        </div>
      </div>
    </>
  )
}