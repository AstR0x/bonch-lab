import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { callApi } from '@common/utils/callApi';

import { api } from './api';
import { actions } from './ducks';

/**
 * Получение справочника групп
 *
 * @returns итератор
 */
function* getGroupsDict(): SagaIterator {
  const groupsDict = yield call(callApi, api.getGroupsDict);

  yield put(actions.setGroupsDict(groupsDict));
}

/**
 * Получение справочника со списком тем
 *
 * @returns итератор
 */
function* getTopicsDict(): SagaIterator {
  const topicsDict = yield call(callApi, api.getTopicsDict);

  yield put(actions.setTopicsDict(topicsDict));
}

/**
 * Получение структуры тем/подтем/уровней
 *
 * @returns итератор
 */
function* getStructure(): SagaIterator {
  const structure = yield call(callApi, api.getStructure);

  yield put(actions.setStructure(structure));
}

export const sagas = {
  getGroupsDict,
  getTopicsDict,
  getStructure,
};
