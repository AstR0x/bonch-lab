import * as R from 'ramda';

import { RootState } from '@store';

/**
 * Селектор состояния лоадера
 */
const isLoadingSelector = (state: RootState): boolean =>
  R.pathOr(false, ['loading', 'isLoading'], state);

export const selectors = {
  isLoadingSelector,
};
