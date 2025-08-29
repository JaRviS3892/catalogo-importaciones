import { act, render } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

const TestComponent = ({ onReady }) => {
    const cart = useCart();
    onReady?.(cart);
    return null;
};

test("loads items from localStorage on init", () => {
    const stored = [{ id: 1, price: "10", qty: 2 }];
    localStorage.setItem("cartItems", JSON.stringify(stored));

    let items;
    render(
        <CartProvider>
            <TestComponent onReady={(cart) => (items = cart.items)} />
        </CartProvider>
    );

    expect(items).toEqual(stored);
});

test("syncs items to localStorage when changed", () => {
    localStorage.clear();
    let api;
    render(
        <CartProvider>
            <TestComponent onReady={(cart) => (api = cart)} />
        </CartProvider>
    );

    act(() => {
        api.addItem({ id: 2, price: "5" }, 1);
    });

    const stored = JSON.parse(localStorage.getItem("cartItems"));
    expect(stored).toEqual([{ id: 2, price: "5", qty: 1 }]);
});

