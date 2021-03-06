import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, takeEvery, call } from 'redux-saga/effects';

import { processHandler } from '@common/sagas';
import { notificationSagas } from '@features/notification';
import {
  tasksSagas,
  GetTaskListParams,
  CreateTaskPayload,
  UpdateTaskPayload,
} from '@features/tasks';
import { history } from '@store';

import { actions } from './actions';

/**
 * Процесс получения списка задач
 *
 * @returns итератор
 */
function* getTaskListProcess({
  payload: getTaskListParams,
}: PayloadAction<GetTaskListParams>): SagaIterator {
  yield call(processHandler, {
    process: tasksSagas.getTaskList,
    payload: getTaskListParams,
  });
}

/**
 * Процесс получения задачи
 *
 * @param id - идентификатор задачи
 * @returns итератор
 */
function* getTaskProcess({ payload: id }: PayloadAction<string>): SagaIterator {
  yield call(processHandler, {
    process: tasksSagas.getTask,
    payload: id,
  });
}

/**
 * Процесс создания задачи (без обработки)
 *
 * @returns итератор
 */
function* notHandledCreateTaskProcess(
  creteTaskPayload: CreateTaskPayload,
): SagaIterator {
  yield call(tasksSagas.createTask, creteTaskPayload);

  yield call(history.goBack);

  yield call(
    notificationSagas.showSuccessNotification,
    'Задача успешно создана!',
  );
}

/**
 * Процесс создания задачи
 *
 * @returns итератор
 */
function* createTaskProcess({
  payload: taskPayload,
}: PayloadAction<CreateTaskPayload>): SagaIterator {
  yield call(processHandler, {
    process: notHandledCreateTaskProcess,
    payload: taskPayload,
  });
}

/**
 * Процесс обновления задачи (без обработки)
 *
 * @returns итератор
 */
function* notHandledUpdateTaskProcess(
  updateTaskPayload: UpdateTaskPayload,
): SagaIterator {
  yield call(tasksSagas.updateTask, updateTaskPayload);

  yield call(history.goBack);

  yield call(
    notificationSagas.showSuccessNotification,
    'Задача успешно отредактирована!',
  );
}

/**
 * Процесс обновления задачи
 *
 * @returns итератор
 */
function* updateTaskProcess({
  payload: updateTaskPayload,
}: PayloadAction<UpdateTaskPayload>): SagaIterator {
  yield call(processHandler, {
    process: notHandledUpdateTaskProcess,
    payload: updateTaskPayload,
  });
}

/**
 * Процесс удаления задачи (без обработки)
 *
 * @returns итератор
 */
function* notHandledDeleteTaskProcess(id: string): SagaIterator {
  yield call(tasksSagas.deleteTask, id);

  yield call(
    notificationSagas.showSuccessNotification,
    'Задача успешно удалена!',
  );
}

/**
 * Процесс удаления задачи
 *
 * @param id - идентификатор задачи
 * @returns итератор
 */
function* deleteTaskProcess({
  payload: id,
}: PayloadAction<string>): SagaIterator {
  yield call(processHandler, {
    process: notHandledDeleteTaskProcess,
    payload: id,
  });
}

/**
 * Процесс скачивания приложения к задаче
 *
 * @param id - идентификатор задачи
 * @returns итератор
 */
function* downloadTaskAttachmentProcess({
  payload: id,
}: PayloadAction<string>): SagaIterator {
  yield call(processHandler, {
    process: tasksSagas.downloadTaskAttachment,
    payload: id,
  });
}

/**
 * Вотчер задач
 */
export function* tasksProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(actions.getTaskList, getTaskListProcess),
    takeEvery(actions.getTask, getTaskProcess),
    takeEvery(actions.createTask, createTaskProcess),
    takeEvery(actions.updateTask, updateTaskProcess),
    takeEvery(actions.deleteTask, deleteTaskProcess),
    takeEvery(actions.downloadTaskAttachment, downloadTaskAttachmentProcess),
  ]);
}
