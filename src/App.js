// src/App.js
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProductGridStep1 from "./components/ProductGridStep1";
import CartDrawer from "./components/CartDrawer";
import { useCart } from "./context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    const { getCount } = useCart();
    const itemsCount = getCount();
    const [isCartOpen, setIsCartOpen] = React.useState(false);

    return (
        <div className="App">
            <header className="App-header" id="inicio">
                <img src={logo} className="App-logo" alt="logo" />

                {/* Navegación con icono de carrito y badge */}
                <nav className="App-nav">
                    <a href="#inicio">Inicio</a> |{" "}
                    <a href="#productos">Productos</a> |{" "}
                    <a href="#contacto">Contacto</a> |{" "}
                    <button
                        type="button"
                        className="CartButton"
                        aria-label="Abrir carrito"
                        onClick={() => setIsCartOpen(true)}
                        onKeyDown={(e) =>
                            (e.key === "Enter" || e.key === " ") && setIsCartOpen(true)
                        }
                    >
                        <FaShoppingCart size={18} />
                        {itemsCount > 0 && (
                            <span className="Cart-badge">
                                {itemsCount}
                            </span>
                        )}
                    </button>
                </nav>

                <p>Bienvenido a nuestro catálogo de importaciones.</p>
                <a
                    className="App-link"
                    href="https://react.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>

            <main>
                <ProductGridStep1 />
            </main>

            {/* Drawer del carrito + notificaciones */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <ToastContainer position="top-right" autoClose={2500} />
        </div>
    );
}
