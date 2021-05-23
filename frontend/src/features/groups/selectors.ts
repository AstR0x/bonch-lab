import { createSelector } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { config } from '@common/config';
import { getShortName, getFormattedDate } from '@common/utils';
import { RootState } from '@store';

import { GroupsState } from './ducks';
import { Group, PopulatedGroup } from './types';

/**
 * Селектор модуля групп
 */
const groupsModuleSelector = (state: RootState): GroupsState =>
  R.pathOr(null, [config.modules.groups], state);

/**
 * Селектор списка групп
 */
const groupListSelector = createSelector(
  groupsModuleSelector,
  (groupsModule): Group[] => R.pathOr([], ['groupList'], groupsModule),
);

/**
 * Селектор группы
 */
const groupSelector = createSelector(
  groupsModuleSelector,
  (groupsModule): PopulatedGroup => R.pathOr(null, ['group'], groupsModule),
);

/**
 * Селектор группы для отображения в таблице
 */
const group4TableViewSelector = createSelector(
  groupSelector,
  (group): PopulatedGroup => {
    if (!group) {
      return null;
    }

    return {
      ...group,
      students: group.students.map((student) => ({
        ...student,
        shortName: getShortName({
          name: student.name,
          surname: student.surname,
          patronymic: student.patronymic,
        }),
        regDate: getFormattedDate(student.regDate),
      })),
    };
  },
);

export const selectors = {
  groupsModuleSelector,
  groupListSelector,
  groupSelector,
  group4TableViewSelector,
};
