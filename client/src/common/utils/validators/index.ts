/**
 * Валидирует строку на соответствие имени, фамилии, отчеству
 *
 * @param value - значение, которое нужно провалидировать
 * @returns соответствует ли строка имени, фамилии, отчеству ?
 */
export const validateName = (value: string): boolean =>
  /^[А-Я][а-я]{0,24}$/.test(value);

/**
 * Валидирует строку на соответствие электронной почте
 *
 * @param value - значение, которое нужно провалидировать
 * @returns соответствует ли строка электронной почте ?
 */
export const validateEmail = (value: string): boolean =>
  /^(\w|-|\.)+@(\w|-)+\.((\w|-)+\.)*\w+$/.test(value);

/**
 * Валидирует строку на соответствие паролю
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

export const validators = {
  name: validateName,
  surname: validateName,
  patronymic: validateName,
  email: validateEmail,
  password: validatePassword,
};
