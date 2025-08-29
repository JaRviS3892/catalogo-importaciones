import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    useCallback
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("cartItems");
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch {
                // ignore malformed data
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(items));
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
    const clearCart = () => setItems([]);
    const getCount = useCallback(
        () => items.reduce((acc, item) => acc + item.qty, 0),
        [items]
    );
    const getTotal = useCallback(
        () => items.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0),
        [items]
    );

    const value = useMemo(
        () => ({ items, addItem, removeItem, clearCart, getCount, getTotal }),
        [items, getCount, getTotal]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}
