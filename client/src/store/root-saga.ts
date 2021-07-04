import { SagaIterator } from 'redux-saga';
import { call, all, fork } from 'redux-saga/effects';

import { initProcessWatcher } from '@processes/init';
import { authProcessWatcher } from '@processes/auth';
import { usersProcessWatcher } from '@processes/users';
import { groupsProcessWatcher } from '@processes/groups';
import { tasksProcessWatcher } from '@processes/tasks';
import { dictionariesProcessWatcher } from '@processes/dictionaries';
import { labsProcessWatcher } from '@processes/labs';

/**
 * Главная сага - точка входа
 *
 * @returns итератор
 */
export function* rootSaga(): SagaIterator {
  yield call(console.log, 'Root Saga Runner!');

  yield all(
    [
      initProcessWatcher,
      authProcessWatcher,
      usersProcessWatcher,
      groupsProcessWatcher,
      tasksProcessWatcher,
      labsProcessWatcher,
      dictionariesProcessWatcher,
    ].map(fork),
  );
}
