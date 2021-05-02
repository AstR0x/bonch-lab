import { pathOr, isNil } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { config } from '@common/config';
import { getShortName } from '@common/utils';

import { AuthorizationState } from './ducks';
import { RoleEnum } from './types';

/**
 * Возвращает стор модуля авторизации
 *
 * @param state - стор приложения
 * @returns данные модуля авторизации или null
 */
const authModuleSelector = (state: RootState): AuthorizationState =>
  pathOr(null, [config.modules.auth], state);

/**
 * Возвращает токен доступа
 *
 * @param state - состояние хранилища
 * @returns access токен или null
 */
const tokenSelector = createSelector(authModuleSelector, (auth): string =>
  pathOr(null, ['token'], auth),
);

/**
 * Возвращает данные пользователя, полученные после авторизации
 *
 * @returns данные, полученные после авторизации или null
 */
const userDataSelector = createSelector(authModuleSelector, (auth) =>
  pathOr(null, ['userData'], auth),
);

/**
 * Возвращает информацию о пользователе
 *
 * @returns данные пользователя
 */
const userInfoSelector = createSelector(userDataSelector, (userData) => ({
  shortName: getShortName(userData),
  group: userData.group?.name,
}));

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
  tokenSelector,
  userDataSelector,
  userInfoSelector,
  userRoleSelector,
  isUserAuthorizedSelector,
  isStudentAuthorizedSelector,
  isTeacherAuthorizedSelector,
};
