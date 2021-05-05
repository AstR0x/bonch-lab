import { SagaIterator } from 'redux-saga';
import { all, takeEvery, call } from 'redux-saga/effects';

import { processHandler } from '@common/sagas';
import { dictionariesSagas } from '@features/dictionaries';

import { actions } from './actions';

/**
 * Процесс получения справочника со списком групп
 *
 * @returns итератор
 */
function* getGroupsDictProcess(): SagaIterator {
  yield call(processHandler, {
    process: dictionariesSagas.getGroupsDict,
    loader: true,
  });
}

/**
 * Процесс получения справочника со списком тем
 *
 * @returns итератор
 */
function* getTopicsDictProcess(): SagaIterator {
  yield call(processHandler, {
    process: dictionariesSagas.getTopicsDict,
    loader: true,
  });
}

/**
 * Вотчер справочников
 */
export function* dictionariesProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(actions.getGroupsDict, getGroupsDictProcess),
    takeEvery(actions.getTopicsDict, getTopicsDictProcess),
  ]);
}
