import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { handleWorker } from '@common/sagas';
import { sagas as notificationSagas } from '@features/notification';
import { LOADERS } from '@features/loading';
import {
  sagas as authSagas,
  utils as authUtils,
  SignInPayload,
  SignUpPayload,
} from '@features/auth';

import { actions as authActions } from './actions';

/**
 * Авторизация пользователя (без обработки)
 *
 * @param signInPayload - данные авторизации
 */
function* notHandledSignInWorker(signInPayload: SignInPayload): SagaIterator {
  // Авторизуемся
  yield call(authSagas.signIn, signInPayload);
  // Показываем уведомление об успешной авторизации
  yield call(
    notificationSagas.showSuccessNotification,
    'Авторизация успешно пройдена!',
  );
}

/**
 * Авторизация пользователя
 *
 * @param payload - данные авторизации
 */
function* signInWorker({
  payload: signInPayload,
}: PayloadAction<SignInPayload>): SagaIterator {
  yield call(handleWorker, {
    worker: notHandledSignInWorker,
    payload: signInPayload,
    loader: LOADERS.SIGN_IN_LOADING,
  });
}

/**
 * Регистрация пользователя (без обработки)
 *
 * @param signUpPayload - данные регистрации
 */
function* notHandledSignUpWorker(signUpPayload: SignUpPayload): SagaIterator {
  // Регистрируемся
  yield call(authSagas.signUp, signUpPayload);
  // Показываем уведомление об успешной регистрации
  yield call(
    notificationSagas.showSuccessNotification,
    'Регистрация успешно пройдена!',
  );
}
/**
 * Регистрация пользователя
 *
 * @param payload - данные регистрации
 */
function* signUpWorker({
  payload: signUpPayload,
}: PayloadAction<SignUpPayload>): SagaIterator {
  yield call(handleWorker, {
    worker: notHandledSignUpWorker,
    payload: signUpPayload,
    loader: LOADERS.SIGN_UP_LOADING,
  });
}

/**
 * Выход из приложения (без обработки)
 */
function* notHandledSignOutWorker(): SagaIterator {
  // Выходим из приложения
  yield call(authSagas.signOut);
  // Показываем уведомление об успешном выходе
  yield call(
    notificationSagas.showSuccessNotification,
    'Выход успешно выполнен!',
  );
}

/**
 * Выход из приложения
 */
function* signOutWorker(): SagaIterator {
  yield call(handleWorker, {
    worker: notHandledSignOutWorker,
    loader: LOADERS.SIGN_OUT_LOADING,
  });
}

/**
 * Автоматическая авторизация пользователя (без обработки)
 */
export function* notHandledAutoSignInWorker(): SagaIterator {
  // Получаем токен из localStorage
  const token = authUtils.getSessionToken();

  if (token) {
    yield call(authSagas.setTokenInStore, token);
  }
}

/**
 * Автоматическая авторизация пользователя
 */
function* autoSignInWorker(): SagaIterator {
  yield call(handleWorker, {
    worker: notHandledAutoSignInWorker,
  });
}

/**
 * Вотчер авторизации
 */
export function* authWatcher(): SagaIterator {
  yield all([takeEvery(authActions.signIn, signInWorker)]);
  yield all([takeEvery(authActions.signUp, signUpWorker)]);
  yield all([takeEvery(authActions.signOut, signOutWorker)]);
  yield all([takeEvery(authActions.autoSignIn, autoSignInWorker)]);
}
