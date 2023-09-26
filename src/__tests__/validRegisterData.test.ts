import { isOldEnough } from '../components/Forms/utils/validRegisterData';

describe('isOldEnough function', () => {
  it('should return true if the input date is 13 years ago', () => {
    const thirteenYearsAgo = new Date();
    thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);

    expect(isOldEnough(thirteenYearsAgo)).toBe(true);
  });

  it('should return false if the input date is less than 13 years ago', () => {
    const twelveYearsAgo = new Date();
    twelveYearsAgo.setFullYear(twelveYearsAgo.getFullYear() - 12);

    expect(isOldEnough(twelveYearsAgo)).toBe(false);
  });

  it('should return true if the input date is more than 13 years ago', () => {
    const fourteenYearsAgo = new Date();
    fourteenYearsAgo.setFullYear(fourteenYearsAgo.getFullYear() - 14);

    expect(isOldEnough(fourteenYearsAgo)).toBe(true);
  });

  it('should return false if the input date is a future date', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    expect(isOldEnough(futureDate)).toBe(false);
  });

  it('should return false if the input is not a valid date', () => {
    expect(isOldEnough('invalidDate')).toBe(false);
  });
});
