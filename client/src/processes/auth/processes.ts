import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { URLS } from '@src/constants';
import { history } from '@store';
import { sagas as notificationSagas } from '@features/notification';
import { actions as loadingActions, LOADERS } from '@features/loading';
import {
  sagas as authSagas,
  utils as authUtils,
  SignInPayload,
  SignUpPayload,
} from '@features/auth';

import { actions as authActions } from './actions';

/**
 * Авторизация пользователя
 *
 * @param payload - данные авторизации
 */
function* signInWorker({
  payload: signInPayload,
}: PayloadAction<SignInPayload>): SagaIterator {
  try {
    // Показываем лоадер
    yield put(loadingActions.showLoader(LOADERS.SIGN_IN_LOADING));
    // Авторизуемся
    yield call(authSagas.signIn, signInPayload);
    // Показываем уведомление об успешной авторизации
    yield call(
      notificationSagas.showSuccessNotification,
      'Авторизация успешно пройдена!',
    );
  } catch (error) {
    // Показываем уведомление с текстом ошибки
    yield call(notificationSagas.showErrorNotification, error.message);
  } finally {
    // Скрываем лоадер
    yield put(loadingActions.hideLoader(LOADERS.SIGN_IN_LOADING));
  }
}

/**
 * Регистрация пользователя
 *
 * @param payload - данные регистрации
 */
function* signUpWorker({
  payload: signUpPayload,
}: PayloadAction<SignUpPayload>): SagaIterator {
  try {
    // Показываем лоадер
    yield put(loadingActions.showLoader(LOADERS.SIGN_UP_LOADING));
    // Регистрируемся
    yield call(authSagas.signUp, signUpPayload);
    // Редирект на страницу авторизации
    yield call(history.push, URLS.AUTHORIZATION_PAGE);
    // Показываем уведомление об успешной регистрации
    yield call(
      notificationSagas.showSuccessNotification,
      'Регистрация успешно пройдена!',
    );
  } catch (error) {
    // Показываем уведомление с текстом ошибки
    yield call(notificationSagas.showErrorNotification, error.message);
  } finally {
    // Скрываем лоадер
    yield put(loadingActions.hideLoader(LOADERS.SIGN_UP_LOADING));
  }
}

/**
 * Автоматическая авторизация пользователя
 */
export function* autoSignInWorker(): SagaIterator {
  try {
    // Получаем токен из localStorage
    const token = authUtils.getSessionToken();

    if (token) {
      yield call(authSagas.setTokenInStore, token);
    }
  } catch (error) {
    // Показываем уведомление с текстом ошибки
    yield call(notificationSagas.showErrorNotification, error.message);
  }
}

/**
 * Вотчер авторизации
 */
export function* authWatcher(): SagaIterator {
  yield all([takeEvery(authActions.signIn, signInWorker)]);
  yield all([takeEvery(authActions.signUp, signUpWorker)]);
  yield all([takeEvery(authActions.autoSignIn, autoSignInWorker)]);
}
