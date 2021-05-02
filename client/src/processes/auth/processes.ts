import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { URLS } from '@src/constants';
import { processHandler } from '@common/sagas';
import { notificationSagas } from '@features/notification';
import {
  authSagas,
  authUtils,
  SignInPayload,
  SignUpPayload,
} from '@features/auth';
import { history } from '@store';

import { actions as authActions } from './actions';

/**
 * Процесс авторизации пользователя (без обработки)
 *
 * @param signInPayload - данные авторизации
 */
function* notHandledSignInProcess(signInPayload: SignInPayload): SagaIterator {
  // Авторизуемся
  yield call(authSagas.signIn, signInPayload);
  // Показываем уведомление об успешной авторизации
  yield call(
    notificationSagas.showSuccessNotification,
    'Авторизация успешно пройдена!',
  );
}

/**
 * Процесс авторизации пользователя
 *
 * @param payload - данные авторизации
 */
function* signInProcess({
  payload: signInPayload,
}: PayloadAction<SignInPayload>): SagaIterator {
  yield call(processHandler, {
    process: notHandledSignInProcess,
    payload: signInPayload,
    loader: true,
  });
}

/**
 * Процесс регистрации пользователя (без обработки)
 *
 * @param signUpPayload - данные регистрации
 */
function* notHandledSignUpProcess(signUpPayload: SignUpPayload): SagaIterator {
  // Регистрируемся
  yield call(authSagas.signUp, signUpPayload);
  // Переходим на страницу авторизации
  yield call(history.push, URLS.AUTHORIZATION_PAGE);
  // Показываем уведомление об успешной регистрации
  yield call(
    notificationSagas.showSuccessNotification,
    'Регистрация успешно пройдена!',
  );
}
/**
 * Процесс регистрации пользователя
 *
 * @param payload - данные регистрации
 */
function* signUpProcess({
  payload: signUpPayload,
}: PayloadAction<SignUpPayload>): SagaIterator {
  yield call(processHandler, {
    process: notHandledSignUpProcess,
    payload: signUpPayload,
    loader: true,
  });
}

/**
 * Процесс выхода из приложения (без обработки)
 */
function* notHandledSignOutProcess(): SagaIterator {
  // Выходим из приложения
  yield call(authSagas.signOut);
  // Показываем уведомление об успешном выходе
  yield call(
    notificationSagas.showSuccessNotification,
    'Выход успешно выполнен!',
  );
}

/**
 * Процесс выхода из приложения
 */
function* signOutProcess(): SagaIterator {
  yield call(processHandler, {
    process: notHandledSignOutProcess,
    loader: true,
  });
}

/**
 * Процесс автоматической авторизации пользователя (без обработки)
 */
export function* notHandledAutoSignInProcess(): SagaIterator {
  // Получаем токен из localStorage
  const token = authUtils.getSessionToken();

  if (token) {
    yield call(authSagas.setTokenInStore, token);
  }
}

/**
 * Процесс автоматической авторизация пользователя
 */
function* autoSignInProcess(): SagaIterator {
  yield call(processHandler, {
    process: notHandledAutoSignInProcess,
    loader: true,
  });
}

/**
 * Вотчер авторизации
 */
export function* authProcessWatcher(): SagaIterator {
  yield all([takeEvery(authActions.signIn, signInProcess)]);
  yield all([takeEvery(authActions.signUp, signUpProcess)]);
  yield all([takeEvery(authActions.signOut, signOutProcess)]);
  yield all([takeEvery(authActions.autoSignIn, autoSignInProcess)]);
}
