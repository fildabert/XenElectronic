import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";


export default function NavBar({}) {
  const { cart } = useSelector((state) => state);

  return (
    <div className="container-row justify-space-between navbar">
      <h1>XenElectronic</h1>
      <NavLink to='/'>
        <h3>Products</h3>
      </NavLink>
      <NavLink to='/cart'>
        <h3>Cart{ cart.items.length ? `(${cart.items.length})` : '' }</h3>
      </NavLink>
    </div>
  )
}