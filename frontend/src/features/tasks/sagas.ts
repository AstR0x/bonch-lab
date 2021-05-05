import { call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

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
 * @returns итератор
 */
function* getTaskList(getTaskListParams?: GetTaskListParams): SagaIterator {
  const taskList = yield call(callApi, api.getTaskList, [getTaskListParams]);

  yield put(actions.setTaskList(taskList));
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

/**
 * Получение задачи
 *
 * @param id - идентификатор задачи
 * @returns итератор
 */
function* getTask(id: string): SagaIterator {
  const task = yield call(callApi, api.getTask, [id]);

  yield put(actions.setOpenedTask(task));
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

export const sagas = {
  getTaskList,
  getTask,
  getStructure,
  createTask,
  updateTask,
  deleteTask,
};
