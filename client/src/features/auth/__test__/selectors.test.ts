import 'regenerator-runtime';

import { getShortName } from '@common/utils';
import { createMockState } from '@store/mockState';

import { selectors } from '../selectors';
import { initAuthState, authState } from './mocks';

/**
 * Unit тесты на селекторы модуля auth
 */
describe('auth selectors', () => {
  describe('with init state', () => {
    const state = createMockState({ auth: initAuthState });

    it('tokenSelector should return correct answer', () => {
      expect(selectors.tokenSelector(state)).toBeNull();
    });

    it('userDataSelector should return correct answer', () => {
      expect(selectors.userDataSelector(state)).toBeNull();
    });

    it('userRoleSelector should return correct answer', () => {
      expect(selectors.userRoleSelector(state)).toBeNull();
    });

    it('isUserAuthorizedSelector should return correct answer', () => {
      expect(selectors.isUserAuthorizedSelector(state)).toBeFalsy();
    });

    it('isStudentAuthorizedSelector should return correct answer', () => {
      expect(selectors.isStudentAuthorizedSelector(state)).toBeFalsy();
    });

    it('isTeacherAuthorizedSelector should return correct answer', () => {
      expect(selectors.isTeacherAuthorizedSelector(state)).toBeFalsy();
    });

    it('userInfoSelector should return correct answer', () => {
      expect(selectors.userInfoSelector(state)).toBeNull();
    });
  });

  describe('with filled state', () => {
    const state = createMockState({ auth: authState });

    it('tokenSelector should return token', () => {
      expect(selectors.tokenSelector(state)).toEqual(authState.token);
    });

    it('userDataSelector should return userData', () => {
      expect(selectors.userDataSelector(state)).toEqual(authState.userData);
    });

    it('userRoleSelector should return userRole', () => {
      expect(selectors.userRoleSelector(state)).toEqual(authState.userData.role);
    });

    it('isUserAuthorizedSelector should return correct answer', () => {
      expect(selectors.isUserAuthorizedSelector(state)).toBeTruthy();
    });

    it('isStudentAuthorizedSelector should return correct answer', () => {
      expect(selectors.isStudentAuthorizedSelector(state)).toBeFalsy();
    });

    it('isTeacherAuthorizedSelector should return correct answer', () => {
      expect(selectors.isTeacherAuthorizedSelector(state)).toBeTruthy();
    });

    it('userInfoSelector should return correct answer', () => {
      expect(selectors.userInfoSelector(state)).toEqual({
        shortName: getShortName({
          name: authState.userData.name,
          surname: authState.userData.surname,
          patronymic: authState.userData.patronymic,
        }),
        role: authState.userData.role,
      });
    });
  });
});
