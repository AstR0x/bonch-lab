import { SagaIterator } from 'redux-saga';
import { put, all, takeEvery, call } from 'redux-saga/effects';

import { logger } from '@common/utils';
import { actions as authActions } from '@processes/auth';

import { actions as initProcessActions } from './actions';

/**
 * Процесс инициализации приложения
 *
 * @returns итератор
 */
function* initProcess(): SagaIterator {
  // Запускаем автоматическую авторизацию пользователя
  yield put(authActions.autoSignIn());

  yield call(logger, 'Run init process!');
}

/**
 * Вотчер процесса инициализации приложения
 *
 * @returns итератор
 */
export function* initProcessWatcher(): SagaIterator {
  yield all([takeEvery(initProcessActions.initApp, initProcess)]);
}
