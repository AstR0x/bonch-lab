import { createSelector } from '@reduxjs/toolkit';
import { isNil, not, pathOr } from 'ramda';

import { RootState } from '@store';
import { config } from '@common/config';

import { ErrorsState } from './ducks';

const errorsModuleSelector = (state: RootState): ErrorsState =>
  state[config.modules.errors];

/**
 * ## [Селектор] Есть ли глобальная ошибка
 */
const isErrorExist = createSelector(errorsModuleSelector, (errors): boolean =>
  not(isNil(errors)),
);

/**
 * ## [Селектор] Получить заголовок ошибки
 */
const errorTitle = createSelector(errorsModuleSelector, (error): string =>
  pathOr('', ['title'], error),
);

/**
 * ## [Селектор] Получить текст ошибки
 */
const errorMessage = createSelector(errorsModuleSelector, (error): string =>
  pathOr('', ['message'], error),
);

/**
 * ## [Селектор] Получить код ошибки
 */
const errorCode = createSelector(errorsModuleSelector, (error): string =>
  pathOr('', ['code'], error),
);

export const selectors = {
  isErrorExist,
  errorTitle,
  errorMessage,
  errorCode,
};
