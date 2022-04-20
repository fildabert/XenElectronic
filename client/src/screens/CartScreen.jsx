import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import { checkoutCart } from "../store/actions/cart.action";

export default function CartScreen() {
  const dispatch = useDispatch()
  const { cart, username } = useSelector((state) => state)

  const buildCartItemHeader = () => {
    return (
      <thead>
        <tr>
          <th>Image</th>
          <th>Product</th> 
          <th>Quantity</th> 
          <th>Price</th> 
          <th>Total</th> 
        </tr>
      </thead>
    )
  }

  const buildCartItemList = () => {
    return(
      <>
        {
          cart.items.map(item => {
            return <CartItem key={item.product.id} cart={item} />
          })
        }
      </>
    )
  }

  const checkout = () => {
    dispatch(checkoutCart(username));
  }

  return (
    <div>
      <h2>Cart</h2>
      <table>
        { buildCartItemHeader() }
        <tbody>
          { buildCartItemList() } 
        </tbody>
      </table>

      <button onClick={checkout}>Checkout</button>
    </div>
  )
}