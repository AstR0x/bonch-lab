import { SagaIterator } from 'redux-saga';
import { call, all, fork } from 'redux-saga/effects';

import { initProcessWatcher } from '@processes/init';
import { authProcessWatcher } from '@processes/auth';
import { groupsProcessWatcher } from '@processes/groups';

/**
 * Главная сага - точка входа
 *
 * @returns итератор
 */
export function* rootSaga(): SagaIterator {
  yield call(console.log, 'Root Saga Runner!');

  yield all(
    [initProcessWatcher, authProcessWatcher, groupsProcessWatcher].map(fork),
  );
}
