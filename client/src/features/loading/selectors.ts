import { pathOr } from 'ramda';

import { RootState } from '@store';

/**
 * Селектор лоадера
 * @param loader - название лоадера
 * @returns функция, которая возвращает состояние лоадера
 */
const isLoadingSelector = (loader: string) => (state: RootState): boolean =>
  pathOr(false, ['loading', loader], state);

export const selectors = {
  isLoadingSelector,
};
