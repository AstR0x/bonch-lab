import { pathOr } from 'ramda';

import { RootState } from '@store';

/**
 * Селектор лоадера
 *
 * @returns функция, которая возвращает состояние лоадера
 */
const isLoadingSelector = (state: RootState): boolean =>
  pathOr(false, ['loading', 'isLoading'], state);

export const selectors = {
  isLoadingSelector,
};
