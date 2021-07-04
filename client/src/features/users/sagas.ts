import { call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { callApi } from '@common/utils';
import { groupsActions } from '@features/groups';

import { api } from './api';

/**
 * Удаление пользователя
 *
 * @param id - идентификатор пользователя
 * @returns итератор
 */
function* deleteUser(id: string): SagaIterator {
  yield call(callApi, api.deleteUser, [id]);
}

/**
 * Удаление студента
 *
 * @param id - идентификатор студента
 * @returns итератор
 */
function* deleteStudent(id: string): SagaIterator {
  yield call(deleteUser, id);

  yield put(groupsActions.deleteGroupStudent(id));
}

export const sagas = {
  deleteUser,
  deleteStudent,
};
