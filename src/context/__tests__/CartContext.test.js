import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';

describe('CartContext', () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  test('addItem adds and increments quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, title: 'A', price: '10' });
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].qty).toBe(1);

    act(() => {
      result.current.addItem({ id: 1, title: 'A', price: '10' });
    });
    expect(result.current.items[0].qty).toBe(2);
  });

  test('removeItem removes item by id', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, title: 'A', price: '10' });
      result.current.addItem({ id: 2, title: 'B', price: '15' });
    });

    act(() => {
      result.current.removeItem(1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(2);
  });

  test('clearCart empties all items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, title: 'A', price: '10' });
      result.current.addItem({ id: 2, title: 'B', price: '15' });
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });

  test('getCount returns total quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, title: 'A', price: '10' }, 2);
      result.current.addItem({ id: 2, title: 'B', price: '15' }, 3);
    });

    expect(result.current.getCount()).toBe(5);
  });

  test('getTotal returns sum of item totals', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({ id: 1, title: 'A', price: '$10' }, 2);
      result.current.addItem({ id: 2, title: 'B', price: '15' }, 1);
    });

    expect(result.current.getTotal()).toBe(35);
  });
});

