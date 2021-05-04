import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { config } from '@common/config';
import { setStoreField } from '@common/utils';

import { Dictionary } from './types';

export interface DictionariesState {
  /** Справочник списка групп */
  groupList: Dictionary[];
  /** Справочник списка тем */
  topicList: Dictionary[];
}

const initialState: DictionariesState = {
  groupList: [],
  topicList: [],
};

/**
 * Добавление группы в справочник списка групп
 *
 * @param state - состояние стора модуля
 * @param createdGroup - созданная группа
 */
const addGroup = (
  state: DictionariesState,
  { payload: createdGroup }: PayloadAction<Dictionary>,
) => {
  const sortByTitle = R.sortBy(R.prop('title'));
  state.groupList.push(createdGroup);
  state.groupList = sortByTitle(state.groupList);
};

/**
 * Обновление группы в справочнике списка групп
 *
 * @param state - состояние стора модуля
 * @param updatedGroup - обновленная группа
 */
const updateGroup = (
  state: DictionariesState,
  { payload: updatedGroup }: PayloadAction<Dictionary>,
) => {
  const sortByTitle = R.sortBy(R.prop('title'));
  state.groupList = sortByTitle(
    state.groupList.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group,
    ),
  );
};

/**
 * Удаление группы из справочника списка групп
 *
 * @param state - состояние стора модуля
 * @param id - идентификатор удаленной группы
 */
const deleteGroup = (
  state: DictionariesState,
  { payload: id }: PayloadAction<string>,
) => {
  state.groupList = state.groupList.filter((group) => group.id !== id);
};

const dictionariesSlice = createSlice({
  name: config.modules.dictionaries,
  initialState,
  reducers: {
    setGroupListDict: setStoreField('groupList'),
    setTopicListDict: setStoreField('topicList'),
    addGroup,
    updateGroup,
    deleteGroup,
  },
});

export const { reducer: dictionariesReducer, actions } = dictionariesSlice;
