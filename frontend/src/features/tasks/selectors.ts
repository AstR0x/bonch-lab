import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { config } from '@common/config';

import { TasksState } from './ducks';
import { Task } from './types';

/**
 * Возвращает стор модуля задач
 *
 * @param state - стор приложения
 * @returns данные модуля задач
 */
const tasksModuleSelector = (state: RootState): TasksState =>
  pathOr(null, [config.modules.tasks], state);

/**
 * Возвращает список групп
 *
 * @param state - состояние хранилища
 * @returns список групп
 */
const taskListSelector = createSelector(
  tasksModuleSelector,
  (tasksModule): Task[] => pathOr(null, ['tasksList'], tasksModule),
);

export const selectors = {
  tasksModuleSelector,
  taskListSelector,
};
