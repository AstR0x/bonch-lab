import * as R from 'ramda';
import { all, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import jwtDecode from 'jwt-decode';

import { callApi } from '@common/utils';
import { tasksSagas } from '@features/tasks';
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
  // Декодируем JWT токен доступа
  const decodedToken = yield call(jwtDecode, token);

  // Формируем данные пользователя, отбросив лишние поля
  const userData = R.omit(['iat', 'exp'], decodedToken);

  // Записываем данные, полученные из токена доступа в стор
  yield put(actions.setUserData(userData));

  // Записываем токен в стор
  yield put(actions.setToken(token));
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

/**
 * Выход из приложения
 */
function* signOut(): SagaIterator {
  // Выполняем запрос на выход из приложения
  yield call(callApi, api.signOut);

  // Удаляем токен из localStorage
  yield call(utils.deleteSessionToken);

  // Удаляем токен и данные пользователя из стора
  yield put(actions.resetAuthData());
}

/**
 * Получение данных после авторизации
 */
function* getDataAfterSignIn(): SagaIterator {
  // Получаем структуру тем/подтем/уровней и список тем
  yield all([
    call(tasksSagas.getStructure),
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
