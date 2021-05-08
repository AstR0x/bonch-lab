import { pathOr } from 'ramda';

import { RootState } from '@store';

/**
 * Селектор состояния лоадера
 */
const isLoadingSelector = (state: RootState): boolean =>
  pathOr(false, ['loading', 'isLoading'], state);

export const selectors = {
  isLoadingSelector,
};
