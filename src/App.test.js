import { render, screen } from '@testing-library/react';
import App from './App';
import { CartProvider } from './context/CartContext';

test('renders learn react link', () => {
  render(
    <CartProvider>
      <App />
    </CartProvider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
