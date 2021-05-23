/**
 * Валидация строки на соответствие имени, фамилии, отчеству
 *
 * @param value - значение, которое нужно провалидировать
 * @returns соответствует ли строка имени, фамилии, отчеству ?
 */
export const validateName = (value: string): boolean =>
  /^[А-Я][а-я]{0,24}$/.test(value);

/**
 * Валидация строки на соответствие электронной почте
 *
 * @param value - значение, которое нужно провалидировать
 * @returns соответствует ли строка электронной почте ?
 */
export const validateEmail = (value: string): boolean =>
  /^(\w|-|\.)+@(\w|-)+\.((\w|-)+\.)*\w+$/.test(value);

/**
 * Валидация строки на соответствие паролю
 *
 * @param value - значение, которое нужно провалидировать
 * @returns соответствует ли строка паролю ?
 */
export const validatePassword = (value: string): boolean => {
  if (value.length < 8) return false;
  if (!/\d/.test(value)) return false;
  if (!/[A-я]/.test(value)) return false;
  return true;
};

/**
 * Валидация строки на соответствие названию группы
 *
 * @param value - значение, которое нужно провалидировать
 * @returns соответствует ли строка названию группы ?
 */
export const validateGroupName = (value: string): boolean => {
  return /[А-Я]{1,5}-\d{1,3}[А-я]{0,3}/.test(value);
};

export const validators = {
  email: validateEmail,
  password: validatePassword,
};
