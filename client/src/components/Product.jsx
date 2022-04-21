import { useSelector } from "react-redux";
import CartButton from "./CartButton";

export default function Product(props) {
  const { cart } = useSelector((state) => state)

  const productInCart = cart.items.find(item => item.productId === props.product.id);

  return (
    <>
      <div className="container-column align-center product-card">
        <div className="content-padding">
          <img src={props.product.imageUrl} alt="" />

          <div className="container-column">
            <p>{props.product.name}</p> 
            <p>Rp {props.product.price}</p>
            <CartButton product={props.product} cart={productInCart} />
          </div>

        </div>
      </div>
    </>
  )
}