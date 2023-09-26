import { render, screen } from '@testing-library/react';
import { UserProfilePage } from '../pages/UserProfilePage/UserProfilePage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('UserProfilePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  it('should render profile page if ID is found in localStorage', () => {
    localStorage.setItem('id', 'sample-id');

    render(<UserProfilePage />);

    const profileHeader = screen.getByText('Profile');
    expect(profileHeader).toBeInTheDocument();
  });
});
