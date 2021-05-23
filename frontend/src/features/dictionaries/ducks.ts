import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { config } from '@common/config';
import { setStoreField } from '@common/utils';

import { DictionaryItem, Structure } from './types';

export interface DictionariesState {
  /** Справочник групп */
  groups: DictionaryItem[];
  /** Справочник тем */
  topics: DictionaryItem[];
  /** Структура тем/подтем/уровней  */
  structure: Structure;
}

const initialState: DictionariesState = {
  groups: [],
  topics: [],
  structure: null,
};

/**
 * Добавление группы в справочник групп
 *
 * @param state - состояние стора модуля
 * @param createdGroup - созданная группа
 */
const addGroup = (
  state: DictionariesState,
  { payload: createdGroup }: PayloadAction<DictionaryItem>,
) => {
  const sortByTitle = R.sortBy(R.prop('title'));
  state.groups.push(createdGroup);
  state.groups = sortByTitle(state.groups);
};

/**
 * Обновление группы в справочнике групп
 *
 * @param state - состояние стора модуля
 * @param updatedGroup - обновленная группа
 */
const updateGroup = (
  state: DictionariesState,
  { payload: updatedGroup }: PayloadAction<DictionaryItem>,
) => {
  const sortByTitle = R.sortBy(R.prop('title'));
  state.groups = sortByTitle(
    state.groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group,
    ),
  );
};

/**
 * Удаление группы из справочника групп
 *
 * @param state - состояние стора модуля
 * @param id - идентификатор удаленной группы
 */
const deleteGroup = (
  state: DictionariesState,
  { payload: id }: PayloadAction<string>,
) => {
  state.groups = state.groups.filter((group) => group.id !== id);
};

const dictionariesSlice = createSlice({
  name: config.modules.dictionaries,
  initialState,
  reducers: {
    setGroupsDict: setStoreField('groups'),
    setTopicsDict: setStoreField('topics'),
    setStructure: setStoreField('structure'),
    addGroup,
    updateGroup,
    deleteGroup,
  },
});

export const { reducer: dictionariesReducer, actions } = dictionariesSlice;
