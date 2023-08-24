import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../components/Forms/ErrorMessage';

describe('ErrorMessage component', () => {
  it('renders error message for email', () => {
    const props = {
      name: 'email',
      err: {
        email: { message: 'Invalid email', type: 'validation' },
      },
    };

    render(<ErrorMessage {...props} />);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('renders error message for password', () => {
    const props = {
      name: 'password',
      err: {
        password: { message: 'Invalid password', type: 'validation' },
      },
    };

    render(<ErrorMessage {...props} />);

    expect(screen.getByText('Invalid password')).toBeInTheDocument();
  });

  it('renders error message for firstName', () => {
    const props = {
      name: 'firstName',
      err: {
        firstName: { message: 'Invalid first name', type: 'validation' },
      },
    };

    render(<ErrorMessage {...props} />);

    expect(screen.getByText('Invalid first name')).toBeInTheDocument();
  });
});
