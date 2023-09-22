import { EMAIL_ERROR, PASSWORD_ERROR } from '../constants/errors';
import { validAuthData } from '../components/Forms/utils/validAuthData';

describe('validAuthData', () => {
  it('should validate a valid email and password', async () => {
    const validData = {
      email: 'test@example.com',
      password: 'Password123',
    };

    await expect(validAuthData.isValid(validData)).resolves.toBe(true);
  });

  it('should fail if email is missing', async () => {
    const invalidData = {
      password: 'Password123',
    };

    await expect(validAuthData.isValid(invalidData)).resolves.toBe(false);
  });

  it('should fail if password is missing', async () => {
    const invalidData = {
      email: 'test@example.com',
    };

    await expect(validAuthData.isValid(invalidData)).resolves.toBe(false);
  });

  it('should fail if email is invalid', async () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'Password123',
    };

    await expect(validAuthData.isValid(invalidData)).resolves.toBe(false);
    await expect(validAuthData.validate(invalidData)).rejects.toThrow(
      EMAIL_ERROR.error,
    );
  });

  it('should fail if password is too short', async () => {
    const invalidData = {
      email: 'test@example.com',
      password: 'Pass123',
    };

    await expect(validAuthData.isValid(invalidData)).resolves.toBe(false);
    await expect(validAuthData.validate(invalidData)).rejects.toThrow(
      PASSWORD_ERROR.minLengthText,
    );
  });
});
