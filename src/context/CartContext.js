import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    // Carga inicial desde localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem("cart");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setItems(parsed);
            }
        } catch {
            // Ignorar errores de parseo
        }
    }, []);

    // Sincroniza el carrito en localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addItem = (product, qty = 1) => {
        setItems(prev => {
            const index = prev.findIndex(item => item.id === product.id);
            if (index >= 0) {
                const updated = [...prev];
                updated[index] = { ...updated[index], qty: updated[index].qty + qty };
                return updated;
            }
            return [...prev, { ...product, qty }];
        });
    };

    const removeItem = (id) => setItems(prev => prev.filter(item => item.id !== id));
    const increaseQty = (id) =>
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
            )
        );
    const decreaseQty = (id) =>
        setItems(prev =>
            prev
                .map(item =>
                    item.id === id ? { ...item, qty: item.qty - 1 } : item
                )
                .filter(item => item.qty > 0)
        );
    const clearCart = () => setItems([]);
    const getCount = () => items.reduce((acc, item) => acc + item.qty, 0);
    const getTotal = () =>
        items.reduce((acc, item) => {
            const numericPrice = Number((item.price || "0").replace(/[^\d]/g, ""));
            return acc + numericPrice * item.qty;
        }, 0);

    const value = useMemo(() => ({
        items,
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        clearCart,
        getCount,
        getTotal,
    }), [items]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}
