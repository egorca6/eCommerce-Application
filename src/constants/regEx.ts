// на спец символы валидацию писать не стал, т.к. вроде это не обязательное требование

export const REG_EXP_PASSWORD = {
  oneNumber: new RegExp(/(?=.*?[0-9])+/),
  oneUpperCase: new RegExp(/(?=.*?[A-Z])+/),
  oneLowerCase: new RegExp(/(?=.*?[a-z])+/),
  leadingSpace: new RegExp(/^\S+/),
  trailingSpace: new RegExp(/\S+$/),
  latinLetters: new RegExp(/^[a-zA-Z0-9]+$/),
};

export const REG_EXP_EMAIL = {
  emailValid: new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ),
};

export const REG_EXP_NAME = {
  noSpecialCharacters: new RegExp(/^[A-Za-zА-ЯЁа-яё]+$/),
};

export const REG_EXP_POST_CODE = {
  BY_RU_POST: new RegExp(/^\d{6}$/),
};
