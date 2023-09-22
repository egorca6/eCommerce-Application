import { render, screen } from '@testing-library/react';
import { AboutPage } from '../pages/AboutPage/AboutPage';
import { teamMembers } from '../constants/common';

describe('AboutPage component', () => {
  it('renders the page title', () => {
    render(<AboutPage />);
    const pageTitle = screen.getByText('О команде разработчиков');
    expect(pageTitle).toBeInTheDocument();
  });

  it('renders information for each team member', () => {
    render(<AboutPage />);

    teamMembers.forEach(member => {
      const memberName = screen.getByText(member.name);
      const memberRole = screen.getByText(member.role);

      expect(memberName).toBeInTheDocument();
      expect(memberRole).toBeInTheDocument();
      const memberImage = screen.getByAltText(member.name);

      expect(memberImage).toBeInTheDocument();
      expect(memberImage).toHaveAttribute('src', member.photo);
    });
  });

  it('renders a link to RS School with the RS School logo', () => {
    render(<AboutPage />);
    const rsSchoolLogo = screen.getByAltText('RS School Logo');
    expect(rsSchoolLogo).toBeInTheDocument();
  });
});
