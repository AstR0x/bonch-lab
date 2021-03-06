import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { processHandler } from '@common/sagas';
import { navUtils } from '@features/navigation';
import { notificationSagas } from '@features/notification';
import {
  authSagas,
  authUtils,
  SignInPayload,
  SignUpPayload,
} from '@features/auth';

import { actions as authActions } from './actions';

/**
 * Процесс авторизации пользователя (без обработки)
 *
 * @param signInPayload - данные авторизации
 */
function* notHandledSignInProcess(signInPayload: SignInPayload): SagaIterator {
  yield call(authSagas.signIn, signInPayload);

  yield call(authSagas.getDataAfterSignIn);

  yield call(
    notificationSagas.showSuccessNotification,
    'Авторизация успешно пройдена!',
  );
}

/**
 * Процесс авторизации пользователя
 *
 * @param signInPayload - данные авторизации
 */
function* signInProcess({
  payload: signInPayload,
}: PayloadAction<SignInPayload>): SagaIterator {
  yield call(processHandler, {
    process: notHandledSignInProcess,
    payload: signInPayload,
  });
}

/**
 * Процесс регистрации пользователя (без обработки)
 *
 * @param signUpPayload - данные регистрации
 */
function* notHandledSignUpProcess(signUpPayload: SignUpPayload): SagaIterator {
  yield call(authSagas.signUp, signUpPayload);

  yield call(navUtils.goToAuthorizationPage);

  yield call(
    notificationSagas.showSuccessNotification,
    'Регистрация успешно пройдена!',
  );
}
/**
 * Процесс регистрации пользователя
 *
 * @param signUpPayload - данные регистрации
 */
function* signUpProcess({
  payload: signUpPayload,
}: PayloadAction<SignUpPayload>): SagaIterator {
  yield call(processHandler, {
    process: notHandledSignUpProcess,
    payload: signUpPayload,
  });
}

/**
 * Процесс выхода из приложения (без обработки)
 */
function* notHandledSignOutProcess(): SagaIterator {
  yield call(authSagas.signOut);

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
  });
}

/**
 * Процесс автоматической авторизации пользователя (без обработки)
 */
export function* notHandledAutoSignInProcess(): SagaIterator {
  const token = authUtils.getSessionToken();

  if (token) {
    yield call(authSagas.getDataAfterSignIn);

    yield call(authSagas.setTokenInStore, token);
  }
}

/**
 * Процесс автоматической авторизация пользователя
 */
function* autoSignInProcess(): SagaIterator {
  yield call(processHandler, {
    process: notHandledAutoSignInProcess,
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
