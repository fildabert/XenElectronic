import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cart.action";


export default function CartItem(props) {
  const dispatch = useDispatch()
  

  const incrementProduct = () => {
    dispatch(addToCart(props.cart.product.id))
  }

  const decrementProduct = () => {
    dispatch(removeFromCart(props.cart.product.id))
  }

  const buildProductAction = () => {  
    return (
      <div className="container-row justify-space-evenly">
        <button onClick={decrementProduct}>-</button>
        { props.cart.quantity }
        <button onClick={incrementProduct}>+</button>
      </div>
    )  
  }
  return (
    <tr>
      <td><img src={props.cart.product.imageUrl} alt="" /></td> 
      <td>{props.cart.product.name}</td> 
      <td> { buildProductAction() } </td> 
      <td>{props.cart.product.price}</td> 
      <td>{props.cart.product.price * props.cart.quantity}</td> 
    </tr>
  )
}