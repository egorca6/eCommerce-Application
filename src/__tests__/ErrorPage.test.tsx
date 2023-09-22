import { render, screen } from '@testing-library/react';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { MemoryRouter } from 'react-router-dom';
import { PAGES } from '../constants/pages';

describe('ErrorPage component', () => {
  it('renders the error message and a link to the main page', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );
    const mainPageLink = screen.getByText('main page');
    expect(mainPageLink.getAttribute('href')).toBe(PAGES.main.route);
  });
});
