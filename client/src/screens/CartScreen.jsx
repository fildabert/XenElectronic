import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import errorHandler from "../helpers/errorHandler";
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

  const getTotalSum = () => {
    return cart.items.reduce((total, currentValue) => {
      return total + currentValue.quantity * currentValue.product.price;
    }, 0)
  }

  const checkout = () => {
    if(cart.items.length > 0) {
      dispatch(checkoutCart(username));
    } else {
      errorHandler(null, 'Cart is empty');
    }
  }

  return (
    <div>
      <h2>Cart</h2>
      <table>
        { buildCartItemHeader() }
        <tbody>
          { buildCartItemList() } 
        </tbody>
        <tfoot>
          <tr>
            <td>Sum</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Rp {getTotalSum()}</td>
          </tr>
        </tfoot>
      </table>

      <button onClick={checkout}>Checkout</button>
    </div>
  )
}