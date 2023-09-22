import { logOut } from '../utils/user';

describe('logOut', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should remove "id", "auth", and "name" from localStorage', () => {
    localStorage.setItem('id', '123');
    localStorage.setItem('auth', 'true');
    localStorage.setItem('name', 'John');

    logOut();

    expect(localStorage.getItem('id')).toBe(null);
    expect(localStorage.getItem('auth')).toBe(null);
    expect(localStorage.getItem('name')).toBe(null);
  });

  it('should not throw errors if items are not present in localStorage', () => {
    expect(() => logOut()).not.toThrow();
  });
});
