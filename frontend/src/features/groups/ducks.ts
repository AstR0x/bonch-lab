import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { setStoreField } from '@common/utils';

import { Group, PopulatedGroup } from './types';

export interface GroupsState {
  /** Список групп */
  groupList: Group[];
  /** Группа */
  group: PopulatedGroup;
}

const initialState: GroupsState = {
  groupList: null,
  group: null,
};

/**
 * Удаление группы
 *
 * @param state - состояние стора модуля
 */
const deleteGroup = (state: GroupsState) => {
  state.group = null;
};

/**
 * Удаление студента из группы
 *
 * @param state - состояние стора модуля
 * @param id - идентификатор студента
 */
const deleteGroupStudent = (
  state: GroupsState,
  { payload: id }: PayloadAction<string>,
) => {
  state.group.students = state.group.students.filter(
    (student) => student.id !== id,
  );
};

const groupsSlice = createSlice({
  name: config.modules.groups,
  initialState,
  reducers: {
    setGroupList: setStoreField('groupList'),
    setGroup: setStoreField('group'),
    deleteGroup,
    deleteGroupStudent,
  },
});

export const { reducer: groupsReducer, actions } = groupsSlice;
