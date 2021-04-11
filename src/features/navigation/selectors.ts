import { createSelector } from '@reduxjs/toolkit';
import { pathOr } from 'ramda';

import { RootState } from '@store';
import { config } from '@common/config';

const navigationSelector = (state: RootState) => state[config.modules.router];

/**
 * Получение URL страницы
 */
const pathName = createSelector(navigationSelector, (navigation): string =>
  pathOr('/', ['location', 'pathname'], navigation),
);

/**
 * Получение якорной ссылки
 */
const hash = createSelector(navigationSelector, (navigation): string =>
  pathOr('', ['location', 'hash'], navigation),
);

/**
 * Получение query-params в виде объекта
 */
const queryParams = createSelector(navigationSelector, (navigation) =>
  pathOr({}, ['location', 'query'], navigation),
);

/**
 * Получение query-params в виде строки
 */
const searchString = createSelector(navigationSelector, (navigation): string =>
  pathOr('', ['location', 'search'], navigation),
);

export const selectors = {
  pathName,
  hash,
  queryParams,
  searchString,
};
