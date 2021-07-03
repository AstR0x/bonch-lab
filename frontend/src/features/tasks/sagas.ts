import { call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { saveAs } from 'file-saver';

import { callApi } from '@common/utils';

import { api } from './api';
import { actions } from './ducks';
import {
  GetTaskListParams,
  CreateTaskPayload,
  UpdateTaskPayload,
} from './types';

/**
 * Получение списка задач
 *
 * @param getTaskListParams - параметры для получения списка задач
 * @returns итератор
 */
function* getTaskList(getTaskListParams?: GetTaskListParams): SagaIterator {
  const taskList = yield call(callApi, api.getTaskList, [getTaskListParams]);

  yield put(actions.setTaskList(taskList));
}

/**
 * Получение задачи
 *
 * @param id - идентификатор задачи
 * @returns итератор
 */
function* getTask(id: string): SagaIterator {
  const task = yield call(callApi, api.getTask, [id]);

  yield put(actions.setTask(task));
}

/**
 * Создание задачи
 *
 * @param createTaskPayload - данные задачи
 * @returns итератор
 */
function* createTask(createTaskPayload: CreateTaskPayload): SagaIterator {
  yield call(callApi, api.createTask, [createTaskPayload]);
}

/**
 * Обновление задачи
 *
 * @param updateTaskPayload - обновленные данные задачи
 * @returns итератор
 */
function* updateTask(updateTaskPayload: UpdateTaskPayload): SagaIterator {
  yield call(callApi, api.updateTask, [updateTaskPayload]);
}

/**
 * Удаление задачи
 *
 * @param id - идентификатор задачи
 * @returns итератор
 */
function* deleteTask(id: string): SagaIterator {
  const deletedTask = yield call(callApi, api.deleteTask, [id]);

  yield put(actions.deleteTask(deletedTask.id));
}

/**
 * Скачивание отчёта по задаче
 *
 * @param id - идентификатор задачи
 * @returns итератор
 */
function* downloadTaskAttachment(id: string): SagaIterator {
  const data = yield call(callApi, api.downloadTaskAttachment, [id]);

  yield call(saveAs, new Blob([data]), 'Приложение.docx');
}

export const sagas = {
  getTaskList,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  downloadTaskAttachment,
};
