import { SagaIterator } from 'redux-saga';
import { call, all, fork } from 'redux-saga/effects';

import { initProcessWatcher } from '@processes/init';
import { authWatcher } from '@processes/auth';

/**
 * Главная сага - точка входа
 *
 * @returns итератор
 */
export function* rootSaga(): SagaIterator {
  yield call(console.log, 'Root Saga Runner...!');

  yield all([initProcessWatcher, authWatcher].map(fork));
}
