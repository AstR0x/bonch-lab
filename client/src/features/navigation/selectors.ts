import { createSelector } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { RootState } from '@store';
import { config } from '@common/config';

const navigationModuleSelector = (state: RootState) =>
  state[config.modules.router];

/**
 * Селектор URL страницы
 */
const pathname = createSelector(
  navigationModuleSelector,
  (navigation): string => R.pathOr('/', ['location', 'pathname'], navigation),
);

/**
 * Селектор якорной ссылки
 */
const hash = createSelector(navigationModuleSelector, (navigation): string =>
  R.pathOr('', ['location', 'hash'], navigation),
);

/**
 * Селектор query-params в виде объекта
 */
const queryParams = createSelector(navigationModuleSelector, (navigation) =>
  R.pathOr({}, ['location', 'query'], navigation),
);

/**
 * Селектор query-params в виде строки
 */
const searchString = createSelector(
  navigationModuleSelector,
  (navigation): string => R.pathOr('', ['location', 'search'], navigation),
);

export const selectors = {
  pathname,
  hash,
  queryParams,
  searchString,
};
