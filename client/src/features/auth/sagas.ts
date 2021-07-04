import { SagaIterator } from 'redux-saga';
import { all, call, put } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import * as R from 'ramda';

import { callApi } from '@common/utils';
import { dictionariesSagas } from '@features/dictionaries';

import { api } from './api';
import { actions } from './ducks';
import { utils } from './utils';
import { SignInPayload, SignUpPayload } from './types';

/**
 * Устанавливает токен в стор
 *
 * @param token - токен доступа
 */
function* setTokenInStore(token: string): SagaIterator {
  const decodedToken = yield call(jwtDecode, token);

  const userData = R.omit(['iat', 'exp'], decodedToken);

  yield put(actions.setUserData(userData));

  yield put(actions.setToken(token));
}

/**
 * Авторизация
 *
 * @param signInPayload - данные авторизации
 */
function* signIn(signInPayload: SignInPayload): SagaIterator {
  const { password } = signInPayload;

  const encodedPassword = yield call(utils.encodePassword, password);

  const token = yield call(callApi, api.signIn, [
    R.merge(signInPayload, { password: encodedPassword }),
  ]);

  yield call(setTokenInStore, token);

  yield call(utils.setSessionToken, token);
}

/**
 * Регистрация
 *
 * @param signUpPayload - данные регистрации
 */
function* signUp(signUpPayload: SignUpPayload): SagaIterator {
  const { password } = signUpPayload;

  const encodedPassword = yield call(utils.encodePassword, password);

  yield call(callApi, api.signUp, [
    R.merge(signUpPayload, { password: encodedPassword }),
  ]);
}

/**
 * Выход из приложения
 */
function* signOut(): SagaIterator {
  yield call(callApi, api.signOut);

  yield call(utils.deleteSessionToken);

  yield put(actions.resetAuthData());
}

/**
 * Получение данных после авторизации
 */
function* getDataAfterSignIn(): SagaIterator {
  yield all([
    call(dictionariesSagas.getStructure),
    call(dictionariesSagas.getTopicsDict),
  ]);
}

export const sagas = {
  signIn,
  signUp,
  signOut,
  setTokenInStore,
  getDataAfterSignIn,
};
