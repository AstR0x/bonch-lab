import { SagaIterator } from 'redux-saga';
import { put, all, takeEvery, call } from 'redux-saga/effects';

import { request } from '@src/constants';
import { processHandler } from '@common/sagas';
import { createRequestsInterceptor } from '@features/auth';
import { dictionariesSagas } from '@features/dictionaries';
import { authProcessActions } from '@processes/auth';

import { actions as initProcessActions } from './actions';

/**
 * Процесс инициализации приложения (без обработки)
 *
 * @returns итератор
 */
function* notHandledInitProcess(): SagaIterator {
  // Запускаем автоматическую авторизацию пользователя
  yield put(authProcessActions.autoSignIn());

  // Создаём перехватчик запросов
  yield call(createRequestsInterceptor, request.axiosInstance);

  // Загружаем список групп
  yield call(dictionariesSagas.getGroupsDict);
}

/**
 * Процесс инициализации приложения с обработкой
 *
 * @returns итератор
 */
function* initProcess(): SagaIterator {
  yield call(processHandler, {
    process: notHandledInitProcess,
  });
}

/**
 * Вотчер процесса инициализации приложения
 *
 * @returns итератор
 */
export function* initProcessWatcher(): SagaIterator {
  yield all([takeEvery(initProcessActions.initApp, initProcess)]);
}
