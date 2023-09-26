import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../components/Forms/ErrorMessage';

describe('ErrorMessage Component', () => {
  it('renders with error message and correct class', () => {
    const errorMessageText = 'This is an error message';
    render(<ErrorMessage err={errorMessageText} />);

    const errorMessage = screen.getByText(errorMessageText);

    expect(errorMessage).toBeInTheDocument();
  });

  it('renders without error message and has "hidden" class', () => {
    render(<ErrorMessage err={undefined} />);

    const errorMessage = screen.queryByText('This is an error message');

    expect(errorMessage).not.toBeInTheDocument();
  });
});
