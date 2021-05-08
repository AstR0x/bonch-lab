import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { config } from '@common/config';
import { getFormattedDate } from '@common/utils';

import { GroupsState } from './ducks';
import { Group, OpenedGroup } from './types';

/**
 * Селектор модуля групп
 */
const groupsModuleSelector = (state: RootState): GroupsState =>
  pathOr(null, [config.modules.groups], state);

/**
 * Селектор списка групп
 */
const groupListSelector = createSelector(
  groupsModuleSelector,
  (groupsModule): Group[] => pathOr([], ['groupList'], groupsModule),
);

/**
 * Селектор открытой группы
 */
const openedGroupSelector = createSelector(
  groupsModuleSelector,
  (groupsModule): OpenedGroup => pathOr(null, ['openedGroup'], groupsModule),
);

/**
 * Селектор группы для отображения в таблице
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
