import { SagaIterator } from 'redux-saga';
import { put, all, takeEvery, call } from 'redux-saga/effects';

import { request } from '@src/constants';
import { createRequestsInterceptor } from '@features/auth';
import { authProcessActions } from '@processes/auth';

import { actions as initProcessActions } from './actions';

/**
 * Процесс инициализации приложения
 *
 * @returns итератор
 */
function* initProcess(): SagaIterator {
  // Запускаем автоматическую авторизацию пользователя
  yield put(authProcessActions.autoSignIn());

  // Создаём перехватчик запросов
  yield call(createRequestsInterceptor, request.axiosInstance);
}

/**
 * Вотчер процесса инициализации приложения
 *
 * @returns итератор
 */
export function* initProcessWatcher(): SagaIterator {
  yield all([takeEvery(initProcessActions.initApp, initProcess)]);
}
