import { put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { actions } from './ducks';

/**
 * Показ success уведомления
 *
 * @param message - текст сообщения
 * @returns итератор
 */
function* showSuccessNotification(message: string): SagaIterator {
  yield put(
    actions.showNotification({
      severity: 'success',
      message,
    }),
  );
}

/**
 * Показ warning уведомления
 *
 * @param message - текст сообщения
 * @returns итератор
 */
function* showWarningNotification(message: string): SagaIterator {
  yield put(
    actions.showNotification({
      severity: 'warning',
      message,
    }),
  );
}

/**
 * Показ error уведомления
 *
 * @param message - текст сообщения
 * @returns итератор
 */
function* showErrorNotification(message: string): SagaIterator {
  yield put(
    actions.showNotification({
      severity: 'error',
      message,
    }),
  );
}

export const sagas = {
  showSuccessNotification,
  showWarningNotification,
  showErrorNotification,
};
