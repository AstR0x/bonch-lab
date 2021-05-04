import { call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { callApi } from '@common/utils/callApi';

import { api } from './api';
import { actions } from './ducks';

/**
 * Получение справочника со списком групп
 *
 * @returns итератор
 */
function* getGroupListDict(): SagaIterator {
  // Получение списка групп
  const groupListDict = yield call(callApi, api.getGroupListDict);

  // Записываем список групп в стор
  yield put(actions.setGroupListDict(groupListDict));
}

/**
 * Получение справочника со списком тем
 *
 * @returns итератор
 */
function* getTopicListDict(): SagaIterator {
  // Получение списка тем
  const topicListDict = yield call(callApi, api.getTopicListDict);

  // Записываем список групп в стор
  yield put(actions.setTopicListDict(topicListDict));
}

export const sagas = {
  getGroupListDict,
  getTopicListDict,
};
