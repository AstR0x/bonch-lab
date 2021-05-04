import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { setStoreField } from '@common/utils';

import { Group } from './types';

export interface GroupsState {
  /** Список групп */
  groupList: Group[];
  /** Открытая группа */
  openedGroup: Group;
}

const initialState: GroupsState = {
  groupList: null,
  openedGroup: null,
};

/**
 * Удаление открытой группы
 *
 * @param state - состояние стора модуля
 */
const deleteOpenedGroup = (state: GroupsState) => {
  state.openedGroup = null;
};

const groupsSlice = createSlice({
  name: config.modules.groups,
  initialState,
  reducers: {
    setGroupList: setStoreField('groupList'),
    setOpenedGroup: setStoreField('openedGroup'),
    deleteOpenedGroup,
  },
});

export const { reducer: groupsReducer, actions } = groupsSlice;
