import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";

export default function CartDrawer({ isOpen, onClose }) {
    const { items, removeItem, clearCart, getTotal, increaseQty, decreaseQty } = useCart();

    // Variantes para animar el panel
    const drawerVariants = {
        open: { x: 0 },
        closed: { x: "100%" },
    };

    return (
        <>
            {/* Overlay oscurece la pantalla al abrir el carrito */}
            {isOpen && (
                <div
                    className="Cart-overlay"
                    onClick={onClose}
                    aria-label="Cerrar carrito"
                />
            )}

            {/* Panel deslizante */}
            <motion.div
                className="Cart-drawer"
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={drawerVariants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="Cart-header">
                    <h3>Tu carrito</h3>
                    <button className="Cart-close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {items.length === 0 ? (
                    <p className="Cart-empty">Aún no has agregado productos.</p>
                ) : (
                    <ul className="Cart-items">
                        {items.map((item) => (
                            <li key={item.id} className="Cart-item">
                                <div className="Cart-item-info">
                                    <strong>{item.title}</strong>
                                    <span>{item.price}</span>
                                </div>
                                <div className="Cart-item-actions">
                                    <div className="Cart-item-qty">
                                        <button
                                            className="Cart-qtyBtn"
                                            aria-label="Disminuir cantidad"
                                            onClick={() => decreaseQty(item.id)}
                                        >
                                            <FaMinus />
                                        </button>
                                        <span>{item.qty}</span>
                                        <button
                                            className="Cart-qtyBtn"
                                            aria-label="Aumentar cantidad"
                                            onClick={() => increaseQty(item.id)}
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <button
                                        className="Cart-remove"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Quitar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {items.length > 0 && (
                    <>
                        <div className="Cart-total">
                            Total: <strong>${getTotal().toLocaleString()}</strong>
                        </div>
                        <div className="Cart-actions">
                            <button className="Cart-clear" onClick={clearCart}>
                                Vaciar carrito
                            </button>
                            <button className="Cart-checkout" disabled>
                                Finalizar compra
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </>
    );
}
