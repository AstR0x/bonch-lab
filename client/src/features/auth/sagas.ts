import * as R from 'ramda';
import { call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import jwtDecode from 'jwt-decode';

import { callApi } from '@common/utils';

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
  // Декодируем JWT токен доступа
  const decodedToken = yield call(jwtDecode, token);

  // Формируем данные пользователя, отбросив лишние поля
  const userData = R.omit(['iat', 'exp'], decodedToken);

  // Записываем токен в стор
  yield put(actions.setToken(token));

  // Записываем данные, полученные из токена доступа в стор
  yield put(actions.setUserData(userData));
}

/**
 * Авторизация
 *
 * @param signInPayload - данные авторизации
 */
function* signIn(signInPayload: SignInPayload): SagaIterator {
  const { password } = signInPayload;
  // Шифруем пароль
  const encodedPassword = yield call(utils.encodePassword, password);
  // Выполняем запрос на авторизацию
  const token = yield call(callApi, api.signIn, [
    R.merge(signInPayload, { password: encodedPassword }),
  ]);
  // Записываем данные пользователя и токен в стор
  yield call(setTokenInStore, token);
  // Записываем данные пользователя и токен в localStorage
  yield call(utils.setSessionToken, token);
}

/**
 * Регистрация
 *
 * @param signUpPayload - данные регистрации
 */
function* signUp(signUpPayload: SignUpPayload): SagaIterator {
  const { password } = signUpPayload;
  // Шифруем пароль
  const encodedPassword = yield call(utils.encodePassword, password);
  // Выполняем запрос на регистрацию
  yield call(callApi, api.signUp, [
    R.merge(signUpPayload, { password: encodedPassword }),
  ]);
}

export const sagas = { signIn, signUp, setTokenInStore };
