import { AxiosPromise } from 'axios';

import { request } from '@src/constants';

import {
  Task,
  GetTaskListParams,
  CreateTaskPayload,
  UpdateTaskPayload,
} from './types';

/**
 * Получение списка задач
 *
 * @param params - query параметры
 * @returns axios промис
 */
const getTaskList = (params?: GetTaskListParams): AxiosPromise<Task[]> =>
  request.get({ url: 'tasks', config: { params } });

/**
 * Получение задачи
 *
 * @param id - идентификатор задачи
 * @returns axios промис
 */
const getTask = (id: string): AxiosPromise<Task> =>
  request.get({ url: `tasks/${id}` });

/**
 * Создание задачи
 *
 * @param createTaskPayload - данные задачи
 * @returns axios промис
 */
const createTask = (createTaskPayload: CreateTaskPayload): AxiosPromise<Task> =>
  request.post({ url: 'tasks/create', data: createTaskPayload });

/**
 * Обновление задачи
 *
 * @param id - идентификатор задачи
 * @param taskPayload - новые данные задачи
 * @returns axios промис
 */
const updateTask = ({
  id,
  ...taskPayload
}: UpdateTaskPayload): AxiosPromise<Task> =>
  request.patch({ url: `tasks/update/${id}`, data: taskPayload });

/**
 * Удаление задачи
 *
 * @param id - идентификатор задачи
 * @returns axios промис
 */
const deleteTask = (id: string): AxiosPromise<Task> =>
  request.delete({ url: `tasks/delete/${id}` });

export const api = {
  getTaskList,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
