import { render, screen } from '@testing-library/react';
import CartEmpty from '../components/Cart/CartEmpty';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('CartEmpty', () => {
  it('renders "Cart Empty" message', () => {
    render(<CartEmpty />);
    const cartEmptyMessage = screen.getByText('Cart Empty');
    expect(cartEmptyMessage).toBeInTheDocument();
  });

  it('renders a button with label "To catalog"', () => {
    render(<CartEmpty />);
    const toCatalogButton = screen.getByText('To catalog');
    expect(toCatalogButton).toBeInTheDocument();
  });
});
