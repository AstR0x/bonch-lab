import { pathOr, isNil } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { config } from '@common/config';

import { AuthorizationState } from './ducks';
import { RoleEnum } from './types';

/**
 * Возвращает стор модуля авторизации
 *
 * @param state - стор приложения
 * @returns данные модуля авторизации или null
 */
const authSelector = (state: RootState): AuthorizationState =>
  pathOr(null, [config.modules.auth], state);

/**
 * Возвращает токен доступа
 *
 * @param state - состояние хранилища
 * @returns access токен или null
 */
const tokenSelector = createSelector(authSelector, (auth): string =>
  pathOr(null, ['token'], auth),
);

/**
 * Возвращает данные пользователя, полученные после авторизации
 *
 * @returns данные, полученные после авторизации или null
 */
const userDataSelector = createSelector(authSelector, (auth) =>
  pathOr(null, ['userData'], auth),
);

/**
 * Возвращает роль пользователя
 *
 * @returns данные, полученные после авторизации или null
 */
const userRoleSelector = createSelector(userDataSelector, (userData) =>
  pathOr(null, ['role'], userData),
);

/**
 * Возвращает флаг "Пользователь авторизован?"
 *
 * @returns пользователь авторизован ?
 */
const isUserAuthorizedSelector = createSelector(
  tokenSelector,
  (token): boolean => !isNil(token),
);

/**
 * Возвращает флаг "Студент авторизован?"
 *
 * @returns студент авторизован ?
 */
const isStudentAuthorizedSelector = createSelector(
  userRoleSelector,
  (role): boolean => role === RoleEnum.student,
);

/**
 * Возвращает флаг "Преподаватель авторизован?"
 *
 * @returns преподаватель авторизован ?
 */
const isTeacherAuthorizedSelector = createSelector(
  userRoleSelector,
  (role): boolean => role === RoleEnum.teacher,
);

export const selectors = {
  authSelector,
  tokenSelector,
  userDataSelector,
  userRoleSelector,
  isUserAuthorizedSelector,
  isStudentAuthorizedSelector,
  isTeacherAuthorizedSelector,
};
