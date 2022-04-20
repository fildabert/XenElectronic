import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";

export default function CartScreen() {
  // const dispatch = useDispatch()
  const { cart } = useSelector((state) => state)

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

  return (
    <div>
      <h2>Cart</h2>
      <table>
        { buildCartItemHeader() }
        <tbody>
          { buildCartItemList() } 
        </tbody>
      </table>
    </div>
  )
}