import { createSelector } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { RootState } from '@store';
import { config } from '@common/config';

import { TasksState } from './ducks';
import { Task } from './types';

/**
 * Селектор стора модуля задач
 */
const tasksModuleSelector = (state: RootState): TasksState =>
  R.pathOr(null, [config.modules.tasks], state);

/**
 * Селектор списка задач
 */
const taskListSelector = createSelector(
  tasksModuleSelector,
  (tasksModule): Task[] => R.pathOr([], ['taskList'], tasksModule),
);

/**
 * Селектор задачи
 */
const taskSelector = createSelector(
  tasksModuleSelector,
  (tasksModule): Task => R.pathOr(null, ['task'], tasksModule),
);

/**
 * Селектор параметров задачи
 */
const taskParamsSelector = createSelector(
  tasksModuleSelector,
  (tasksModule): Task => R.pathOr(null, ['taskParams'], tasksModule),
);

export const selectors = {
  tasksModuleSelector,
  taskListSelector,
  taskSelector,
  taskParamsSelector,
};
