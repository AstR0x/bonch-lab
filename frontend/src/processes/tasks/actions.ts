import { createAction } from '@reduxjs/toolkit';

import {
  GetTaskListParams,
  CreateTaskPayload,
  UpdateTaskPayload,
} from '@features/tasks';

/**
 * Экшен получения списка задач
 */
const getTaskList = createAction<GetTaskListParams>('getTaskList');

/**
 * Экшен получения одной задачи
 */
const getTask = createAction<string>('getTask');

/**
 * Экшен создания задачи
 */
const createTask = createAction<CreateTaskPayload>('createTask');

/**
 * Экшен обновления задачи
 */
const updateTask = createAction<UpdateTaskPayload>('updateTask');

/**
 * Экшен удаления задачи
 */
const deleteTask = createAction<string>('deleteTask');

export const actions = {
  getTaskList,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
