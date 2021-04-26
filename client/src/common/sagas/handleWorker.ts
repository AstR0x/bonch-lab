import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { actions as loadingActions } from '@features/loading';
import { sagas as notificationSagas } from '@features/notification';
import { actions as authActions, utils as authUtils } from '@features/auth';

import { HandleWorkerPayload } from '../types';

/**
 * Обрабатывает воркеры
 */
export function* handleWorker({
  worker,
  payload,
  loader,
}: HandleWorkerPayload): SagaIterator {
  try {
    if (loader) {
      // Показываем лоадер
      yield put(loadingActions.showLoader(loader));
    }
    // Вызываем воркер
    yield call(worker, payload);
  } catch (error) {
    // Если ошибка связана с токеном
    if (error.status === 401) {
      // Удаляем токен из localStorage
      yield call(authUtils.deleteSessionToken);
      // Удаляем токен и данные пользователя из стора
      yield put(authActions.resetAuthData());
    }
    // Показываем уведомление с текстом ошибки
    yield call(notificationSagas.showErrorNotification, error.message);
  } finally {
    if (loader) {
      // Скрываем лоадер
      yield put(loadingActions.hideLoader(loader));
    }
  }
}
