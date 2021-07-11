import { createSelector } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { RootState } from '@store';
import { config } from '@common/config';
import { getShortName } from '@common/utils';

import { AuthorizationState } from './ducks';
import { RoleEnum } from './types';

/**
 * Селектор модуля авторизации
 */
const authModuleSelector = (state: RootState): AuthorizationState =>
  R.pathOr(null, [config.modules.auth], state);

/**
 * Селектор токена доступа
 */
const tokenSelector = createSelector(authModuleSelector, (auth): string =>
  R.pathOr(null, ['token'], auth),
);

/**
 * Селектор данных пользователя, полученных после авторизации
 */
const userDataSelector = createSelector(authModuleSelector, (auth) =>
  R.pathOr(null, ['userData'], auth),
);

/**
 * Селектор роли пользователя
 */
const userRoleSelector = createSelector(
  userDataSelector,
  (userData): RoleEnum => R.pathOr(null, ['role'], userData),
);

/**
 * Селектор авторизованности пользователя
 */
const isUserAuthorizedSelector = createSelector(
  tokenSelector,
  (token): boolean => !R.isNil(token),
);

/**
 * Селектор авторизованности студента
 */
const isStudentAuthorizedSelector = createSelector(
  userRoleSelector,
  (role): boolean => role === RoleEnum.Student,
);

/**
 * Селектор авторизованности преподавателя
 */
const isTeacherAuthorizedSelector = createSelector(
  userRoleSelector,
  (role): boolean => role === RoleEnum.Teacher,
);

/**
 * Селектор информации пользователя
 */
const userInfoSelector = createSelector(userDataSelector, (userData) => {
  if (!userData) return null;

  return {
    shortName: getShortName(userData),
    role: userData.role,
  };
});

export const selectors = {
  tokenSelector,
  userDataSelector,
  userInfoSelector,
  userRoleSelector,
  isUserAuthorizedSelector,
  isStudentAuthorizedSelector,
  isTeacherAuthorizedSelector,
};
