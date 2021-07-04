import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { setStoreField } from '@common/utils';

import { Task, TaskParams } from './types';

export interface TasksState {
  /** Список задач */
  taskList: Task[];
  /** Задача */
  task: Task[];
  /** Параметры задачи */
  taskParams: TaskParams;
}

const initialState: TasksState = {
  taskList: null,
  task: null,
  taskParams: null,
};

/**
 * Удаление задачи
 *
 * @param state - состояние стора модуля
 * @param id - идентификатор задачи
 */
const deleteTask = (
  state: TasksState,
  { payload: id }: PayloadAction<string>,
) => {
  state.taskList = state.taskList.filter((task) => task.id !== id);
};

const tasksSlice = createSlice({
  name: config.modules.tasks,
  initialState,
  reducers: {
    setTaskList: setStoreField('taskList'),
    setTask: setStoreField('task'),
    setTaskParams: setStoreField('taskParams'),
    deleteTask,
  },
});

export const { reducer: tasksReducer, actions } = tasksSlice;
