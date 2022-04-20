import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cart.action";
import CartButton from "./CartButton";

export default function CartItem(props) {

  return (
    <tr>
      <td><img src={props.cart.product.imageUrl} alt="" /></td> 
      <td>{props.cart.product.name}</td> 
      <td> <CartButton product={props.cart.product} cart={props.cart}/> </td> 
      <td>{props.cart.product.price}</td> 
      <td>{props.cart.product.price * props.cart.quantity}</td> 
    </tr>
  )
}