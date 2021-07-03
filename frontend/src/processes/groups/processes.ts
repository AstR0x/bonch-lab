import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, takeEvery, call } from 'redux-saga/effects';

import { PATHS } from '@src/constants';
import { processHandler } from '@common/sagas';
import { notificationSagas } from '@features/notification';
import {
  groupsSagas,
  CreateGroupPayload,
  UpdateGroupPayload,
} from '@features/groups';
import { history } from '@store';

import { actions } from './actions';

/**
 * Процесс получения списка групп
 *
 * @returns итератор
 */
function* getGroupListProcess(): SagaIterator {
  yield call(processHandler, {
    process: groupsSagas.getGroupList,
  });
}

/**
 * Процесс получения группы
 *
 * @param id - идентификатор группы
 * @returns итератор
 */
function* getGroupProcess({
  payload: id,
}: PayloadAction<string>): SagaIterator {
  yield call(processHandler, {
    process: groupsSagas.getGroup,
    payload: id,
  });
}

/**
 * Процесс создания группы (без обработки)
 *
 * @returns итератор
 */
function* notHandledCreateGroupProcess(
  createGroupPayload: CreateGroupPayload,
): SagaIterator {
  const { id } = yield call(groupsSagas.createGroup, createGroupPayload);

  // Переходим на страницу созданной группы
  yield call(history.push, PATHS.GROUP_PAGE.replace(':id', id));

  yield call(
    notificationSagas.showSuccessNotification,
    'Группа успешно создана!',
  );
}

/**
 * Процесс создания группы
 *
 * @returns итератор
 */
function* createGroupProcess({
  payload: groupPayload,
}: PayloadAction<CreateGroupPayload>): SagaIterator {
  yield call(processHandler, {
    process: notHandledCreateGroupProcess,
    payload: groupPayload,
  });
}

/**
 * Процесс обновления группы (без обработки)
 *
 * @returns итератор
 */
function* notHandledUpdateGroupProcess(
  updateGroupPayload: UpdateGroupPayload,
): SagaIterator {
  const { id } = yield call(groupsSagas.updateGroup, updateGroupPayload);

  // Переходим на страницу обновленный группы
  yield call(history.push, PATHS.GROUP_PAGE.replace(':id', id));

  yield call(
    notificationSagas.showSuccessNotification,
    'Группа успешно отредактирована!',
  );
}

/**
 * Процесс обновления группы
 *
 * @returns итератор
 */
function* updateGroupProcess({
  payload: updateGroupPayload,
}: PayloadAction<UpdateGroupPayload>): SagaIterator {
  yield call(processHandler, {
    process: notHandledUpdateGroupProcess,
    payload: updateGroupPayload,
  });
}

/**
 * Процесс удаления группы (без обработки)
 *
 * @returns итератор
 */
function* notHandledDeleteGroupProcess(id: string): SagaIterator {
  yield call(groupsSagas.deleteGroup, id);

  yield call(history.push, PATHS.HOME_PAGE);

  yield call(
    notificationSagas.showSuccessNotification,
    'Группа успешно удалена!',
  );
}

/**
 * Процесс удаления группы
 *
 * @param id - идентификатор группы
 * @returns итератор
 */
function* deleteGroupProcess({
  payload: id,
}: PayloadAction<string>): SagaIterator {
  yield call(processHandler, {
    process: notHandledDeleteGroupProcess,
    payload: id,
  });
}

/**
 * Вотчер групп
 */
export function* groupsProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(actions.getGroupList, getGroupListProcess),
    takeEvery(actions.getGroup, getGroupProcess),
    takeEvery(actions.createGroup, createGroupProcess),
    takeEvery(actions.updateGroup, updateGroupProcess),
    takeEvery(actions.deleteGroup, deleteGroupProcess),
  ]);
}
