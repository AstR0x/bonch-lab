import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { callApi } from '@common/utils';
import { dictionariesActions } from '@features/dictionaries';

import { api } from './api';
import { actions } from './ducks';
import { CreateGroupPayload, UpdateGroupPayload } from './types';

/**
 * Получение списка групп
 *
 * @returns итератор
 */
function* getGroupList(): SagaIterator {
  const groupList = yield call(callApi, api.getGroupList);

  yield put(actions.setGroupList(groupList));
}

/**
 * Получение группы
 *
 * @param id - идентификатор группы
 * @returns итератор
 */
function* getGroup(id: string): SagaIterator {
  const group = yield call(callApi, api.getGroup, [id]);

  yield put(actions.setGroup(group));
}

/**
 * Создание группы
 *
 * @param createGroupPayload - данные группы
 * @returns итератор
 */
function* createGroup(createGroupPayload: CreateGroupPayload): SagaIterator {
  const createdGroup = yield call(callApi, api.createGroup, [
    createGroupPayload,
  ]);

  // Обновляем справочник списка групп
  yield put(
    dictionariesActions.addGroup({
      id: createdGroup.id,
      title: createdGroup.name,
    }),
  );

  return createdGroup;
}

/**
 * Обновление группы
 *
 * @param updateGroupPayload - обновленные данные группы
 * @returns итератор
 */
function* updateGroup(updateGroupPayload: UpdateGroupPayload): SagaIterator {
  const updatedGroup = yield call(callApi, api.updateGroup, [
    updateGroupPayload,
  ]);

  // Обновляем справочник списка групп
  yield put(
    dictionariesActions.updateGroup({
      id: updatedGroup.id,
      title: updatedGroup.name,
    }),
  );

  return updatedGroup;
}

/**
 * Удаление группы
 *
 * @param id - идентификатор группы
 * @returns итератор
 */
function* deleteGroup(id: string): SagaIterator {
  const deletedGroup = yield call(callApi, api.deleteGroup, [id]);

  // Удаляем открытую группу
  yield put(actions.deleteGroup());

  // Удаляем группу из справочника списка групп
  yield put(dictionariesActions.deleteGroup(deletedGroup.id));
}

export const sagas = {
  getGroupList,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
};
