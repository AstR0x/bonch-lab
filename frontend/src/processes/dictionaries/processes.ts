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
  });
}

/**
 * Процесс получения структуры тем/подтем/уровней
 *
 * @returns итератор
 */
function* getStructureProcess(): SagaIterator {
  yield call(processHandler, {
    process: dictionariesSagas.getStructure,
  });
}

/**
 * Вотчер справочников
 */
export function* dictionariesProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(actions.getGroupsDict, getGroupsDictProcess),
    takeEvery(actions.getTopicsDict, getTopicsDictProcess),
    takeEvery(actions.getStructure, getStructureProcess),
  ]);
}
