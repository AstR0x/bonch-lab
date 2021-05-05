import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { setStoreField } from '@common/utils';

import { Task, Structure, TaskParams } from './types';

export interface TasksState {
  /** Список задач */
  taskList: Task[];
  /** Открытая задача */
  openedTask: Task[];
  /** Параметры задачи */
  taskParams: TaskParams;
  /** Структура тем/подтем/уровней  */
  structure: Structure;
}

const initialState: TasksState = {
  taskList: null,
  openedTask: null,
  taskParams: null,
  structure: null,
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
    setOpenedTask: setStoreField('openedTask'),
    setTaskParams: setStoreField('taskParams'),
    setStructure: setStoreField('structure'),
    deleteTask,
  },
});

export const { reducer: tasksReducer, actions } = tasksSlice;
