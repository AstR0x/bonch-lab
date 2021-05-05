import { call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { callApi } from '@common/utils/callApi';

import { api } from './api';
import { actions } from './ducks';

/**
 * Получение справочника групп
 *
 * @returns итератор
 */
function* getGroupsDict(): SagaIterator {
  // Получение групп
  const groupsDict = yield call(callApi, api.getGroupsDict);

  // Записываем группы в стор
  yield put(actions.setGroupsDict(groupsDict));
}

/**
 * Получение справочника со списком тем
 *
 * @returns итератор
 */
function* getTopicsDict(): SagaIterator {
  // Получение тем
  const topicsDict = yield call(callApi, api.getTopicsDict);

  // Записываем темы в стор
  yield put(actions.setTopicsDict(topicsDict));
}

/**
 * Получение справочника со списком подтем
 *
 * @returns итератор
 */
function* getSubtopicsDict(): SagaIterator {
  // Получение подтем
  const subtopicsDict = yield call(callApi, api.getSubtopicsDict);

  // Записываем подтемы в стор
  yield put(actions.setSubtopicsDict(subtopicsDict));
}

/**
 * Получение справочника с уровнями сложности
 *
 * @returns итератор
 */
function* getLevelsDict(): SagaIterator {
  // Получение уровней сложности
  const levelsDict = yield call(callApi, api.getLevelsDict);

  // Записываем уровни сложности
  yield put(actions.setLevelsDict(levelsDict));
}

export const sagas = {
  getGroupsDict,
  getTopicsDict,
  getSubtopicsDict,
  getLevelsDict,
};
