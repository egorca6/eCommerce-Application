import { render, screen } from '@testing-library/react';
import { Layout } from '../components/Layout';

jest.mock('../components/Headers', () => {
  return {
    Header: (): JSX.Element => <div>Mocked Header</div>,
  };
});

describe('Layout component', () => {
  it('renders Header', () => {
    render(<Layout />);
    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
  });

  it('renders footer with correct text', () => {
    render(<Layout />);
    expect(screen.getByText('RS-School 2023')).toBeInTheDocument();
  });
});
