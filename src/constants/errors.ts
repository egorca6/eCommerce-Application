export const AUTHENTICATE_ERROR = 'Email or password is incorrect';
export const PASSWORD_ERROR = {
  minLength: 8,
  maxLength: 20,
  minLengthText: 'Minimum 8 characters',
  maxLengthText: 'Maximum 20 characters',
  oneNumber: 'Must contain at least one number',
  oneUpperCase: 'Must contain at least one uppercase',
  oneLowerCase: 'Must contain at least one lowercase',
  leadingSpace: 'Must not contain leading whitespace',
  trailingSpace: 'Must not contain trailing whitespace',
  latinLetters: 'Must contain only latin letters',
};
export const EMAIL_ERROR = {
  error: 'email must be a valid email',
};

export const NAME_ERROR = {
  minLength: 1,
  minLengthText: 'Minimum 1 characters',
  noSpecialCharacters: 'No special characters or numbers',
  emptyString: 'Choose your country',
};

export const POST_CODE_ERROR = {
  minLengthCode: 'must be exactly 6 digits',
};

export const REQUIRED = 'Required to fill';
