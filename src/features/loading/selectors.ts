import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { config } from '@common/config';

import { LoadingState } from './ducks';

const loadingSelector = (state: RootState): LoadingState =>
  state[config.modules.loading];

/**
 * ## [Селектор] - Включен ли лоадер
 */
const isLoading = createSelector(
  loadingSelector,
  (loading): boolean => loading.isLoading,
);

/**
 * ## [Селектор] - Включен ли лоадер в глобальном режиме
 */
const isGlobal = createSelector(
  loadingSelector,
  (loading): boolean => loading.isGlobal,
);

export const selectors = {
  isLoading,
  isGlobal,
};
