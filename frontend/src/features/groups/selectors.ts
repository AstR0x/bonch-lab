import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { config } from '@common/config';
import { getFormattedDate } from '@common/utils';

import { GroupsState } from './ducks';
import { Group, OpenedGroup } from './types';

/**
 * Возвращает стор модуля групп
 *
 * @param state - стор приложения
 * @returns данные модуля групп
 */
const groupsModuleSelector = (state: RootState): GroupsState =>
  pathOr(null, [config.modules.groups], state);

/**
 * Возвращает список групп
 *
 * @param state - состояние хранилища
 * @returns список групп
 */
const groupListSelector = createSelector(
  groupsModuleSelector,
  (groupsModule): Group[] => pathOr([], ['groupList'], groupsModule),
);

/**
 * Возвращает открытую группу
 *
 * @param state - состояние хранилища
 * @returns группа
 */
const openedGroupSelector = createSelector(
  groupsModuleSelector,
  (groupsModule): OpenedGroup => pathOr(null, ['openedGroup'], groupsModule),
);

/**
 * Возвращает открытую группу для отображения в таблице
 *
 * @param state - состояние хранилища
 * @returns группа
 */
const openedGroup4TableViewSelector = createSelector(
  openedGroupSelector,
  (openedGroup): OpenedGroup => {
    if (!openedGroup) {
      return null;
    }

    return {
      ...openedGroup,
      students: openedGroup.students.map((student) => ({
        ...student,
        regDate: getFormattedDate(student.regDate),
      })),
    };
  },
);

export const selectors = {
  groupsModuleSelector,
  groupListSelector,
  openedGroupSelector,
  openedGroup4TableViewSelector,
};
