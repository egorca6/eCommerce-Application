import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

test('renders Catalog link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const catalogLink = screen.getByText('ACCESSORIES');
  expect(catalogLink).toBeInTheDocument();
});
