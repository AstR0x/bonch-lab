import * as R from 'ramda';

/**
 * Метод возвращает новый метод который проверяет, есть ли значение в ключе объекта
 *
 * @param hash - объект ключ-массив
 * @returns метод, который проверяет, есть ли значение в массиве
 */
export const includeIn = <T>(hash: T) => (
  value: string,
  path: R.Path,
): boolean => {
  const includesList = R.pathOr([], path, hash);

  return R.includes(value, includesList);
};
