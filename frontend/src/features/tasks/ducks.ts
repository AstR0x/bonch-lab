import { createSlice } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { setStoreField } from '@common/utils';

import { Task } from './types';

export interface TasksState {
  /** Список Задач */
  taskList: Task[];
}

const initialState: TasksState = {
  taskList: null,
};

const tasksSlice = createSlice({
  name: config.modules.tasks,
  initialState,
  reducers: {
    setTaskList: setStoreField('taskList'),
  },
});

export const { reducer: tasksReducer, actions } = tasksSlice;
