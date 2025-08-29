import { render, screen } from "@testing-library/react";
import CartDrawer from "../CartDrawer";
import { CartProvider } from "../../context/CartContext";

test("shows empty cart message", () => {
  render(
    <CartProvider>
      <CartDrawer isOpen onClose={() => {}} />
    </CartProvider>
  );
  expect(screen.getByText(/Aún no has agregado productos/i)).toBeInTheDocument();
});
