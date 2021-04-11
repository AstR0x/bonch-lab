import { SagaIterator } from 'redux-saga';
import { put, delay, all, takeEvery, call } from 'redux-saga/effects';

import { config } from '@common/config';
import { logger } from '@common/utils';
import { actions as loadingActions } from '@features/loading';

import { actions as initProcessActions } from './actions';

/**
 * Процесс инициализации приложения
 *
 * @returns {void}
 */
function* initProcess(): Generator {
  yield put(
    loadingActions.setLoading({
      isLoading: true,
      isGlobal: true,
    }),
  );

  yield delay(config.defaultDelay);

  yield call(logger, 'Run init process!!!');

  yield put(
    loadingActions.setLoading({
      isLoading: false,
      isGlobal: false,
    }),
  );
}

/**
 * Вотчер процесса инициализации приложения
 *
 * @returns {void}
 */
export function* initProcessWatcher(): SagaIterator {
  yield all([takeEvery(initProcessActions.initApp, initProcess)]);
}
