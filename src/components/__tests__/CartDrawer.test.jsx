import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartDrawer from '../CartDrawer';
import { CartProvider, useCart } from '../../context/CartContext';

function renderWithCart(ui) {
  let cart;
  function ContextGrabber() {
    cart = useCart();
    return null;
  }
  render(
    <CartProvider>
      <ContextGrabber />
      {ui}
    </CartProvider>
  );
  return cart;
}

describe('CartDrawer', () => {
  test('renders items and total', () => {
    const cart = renderWithCart(<CartDrawer isOpen onClose={() => {}} />);
    act(() => {
      cart.addItem({ id: 1, title: 'Item A', price: '10' });
    });

    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toHaveTextContent('$10');
  });

  test('removes item when remove button is clicked', async () => {
    const cart = renderWithCart(<CartDrawer isOpen onClose={() => {}} />);
    act(() => {
      cart.addItem({ id: 1, title: 'Item A', price: '10' });
    });

    await userEvent.click(screen.getByRole('button', { name: /Quitar/i }));
    expect(screen.queryByText('Item A')).not.toBeInTheDocument();
    expect(screen.getByText(/Aún no has agregado productos/)).toBeInTheDocument();
  });

  test('clears cart when clear button is clicked', async () => {
    const cart = renderWithCart(<CartDrawer isOpen onClose={() => {}} />);
    act(() => {
      cart.addItem({ id: 1, title: 'Item A', price: '10' });
      cart.addItem({ id: 2, title: 'Item B', price: '20' });
    });

    await userEvent.click(screen.getByRole('button', { name: /Vaciar carrito/i }));
    expect(screen.getByText(/Aún no has agregado productos/)).toBeInTheDocument();
  });
});

