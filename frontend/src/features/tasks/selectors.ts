import * as R from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { config } from '@common/config';

import { TasksState } from './ducks';
import { Task, Structure } from './types';

/**
 * Возвращает стор модуля задач
 *
 * @param state - стор приложения
 * @returns данные модуля задач
 */
const tasksModuleSelector = (state: RootState): TasksState =>
  R.pathOr(null, [config.modules.tasks], state);

/**
 * Возвращает список задач
 *
 * @param state - состояние хранилища
 * @returns список задач
 */
const taskListSelector = createSelector(
  tasksModuleSelector,
  (tasksModule): Task[] => R.pathOr([], ['taskList'], tasksModule),
);

/**
 * Возвращает открытую задачу
 *
 * @param state - состояние хранилища
 * @returns открытая задача
 */
const openedTaskSelector = createSelector(
  tasksModuleSelector,
  (tasksModule): Task => R.pathOr(null, ['openedTask'], tasksModule),
);

/**
 * Возвращает параметры задачи
 *
 * @param state - состояние хранилища
 * @returns параметры задачи
 */
const taskParamsSelector = createSelector(
  tasksModuleSelector,
  (tasksModule): Task => R.pathOr(null, ['taskParams'], tasksModule),
);

/**
 * Возвращает структуру тем/подтем/уровней
 *
 * @param state - состояние хранилища
 * @returns структура тем/подтем/уровней
 */
const structureSelector = createSelector(
  tasksModuleSelector,
  (tasksModule): Structure => R.pathOr(null, ['structure'], tasksModule),
);

export const selectors = {
  tasksModuleSelector,
  taskListSelector,
  openedTaskSelector,
  taskParamsSelector,
  structureSelector,
};
