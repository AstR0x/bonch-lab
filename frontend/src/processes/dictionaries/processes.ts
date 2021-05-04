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
function* getGroupListDictProcess(): SagaIterator {
  yield call(processHandler, {
    process: dictionariesSagas.getGroupListDict,
    loader: true,
  });
}

/**
 * Процесс получения справочника со списком тем
 *
 * @returns итератор
 */
function* getTopicListDictProcess(): SagaIterator {
  yield call(processHandler, {
    process: dictionariesSagas.getTopicListDict,
    loader: true,
  });
}

/**
 * Вотчер справочников
 */
export function* dictionariesProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(actions.getGroupListDict, getGroupListDictProcess),
    takeEvery(actions.getTopicListDict, getTopicListDictProcess),
  ]);
}
