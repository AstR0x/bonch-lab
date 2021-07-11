import { isNil } from 'ramda';

/**
 * Создаёт FormData из object
 *
 * @param obj - объект
 * @returns структура FormData
 */
export const createFormData = (obj: Record<string, any>): FormData => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!isNil(value)) acc.append(key, value);

    return acc;
  }, new FormData());
};
