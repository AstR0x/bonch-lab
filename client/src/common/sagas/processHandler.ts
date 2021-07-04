import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { loadingActions } from '@features/loading';
import { notificationSagas } from '@features/notification';
import { authActions, authUtils } from '@features/auth';

import { ProcessHandlerPayload } from '../types';

/**
 * Обработка процессов
 *
 * @param process - обрабатываемый процесс
 * @param payload - входные данные процесса
 * @param loader - показываем лоадер ?
 * @returns итератор
 */
export function* processHandler({
  process,
  payload,
  loader = true,
}: ProcessHandlerPayload): SagaIterator {
  try {
    if (loader) {
      // Показываем лоадер
      yield put(loadingActions.showLoader());
    }
    // Вызываем процесс
    yield call(process, payload);
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
      yield put(loadingActions.hideLoader());
    }
  }
}
