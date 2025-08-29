import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function NavBar() {
  const { getCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <nav className="NavBar">
      <div className="NavBar-content">
        <h1>Catálogo</h1>
        <button className="Cart-button" onClick={toggleCart} aria-label="Ver carrito">
          <FaShoppingCart />
          {getCount() > 0 && <span className="Cart-count">{getCount()}</span>}
        </button>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
    </nav>
  );
}
