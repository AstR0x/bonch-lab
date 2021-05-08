import * as R from 'ramda';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { setStoreField } from '@common/utils';

import { DictionaryItem } from './types';

export interface DictionariesState {
  /** Справочник групп */
  groups: DictionaryItem[];
  /** Справочник тем */
  topics: DictionaryItem[];
  /** Справочник подтем */
  subtopics: DictionaryItem[];
  /** Справочник уровней */
  levels: DictionaryItem[];
}

const initialState: DictionariesState = {
  groups: [],
  topics: [],
  subtopics: [],
  levels: [],
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
    setSubtopicsDict: setStoreField('subtopics'),
    setLevelsDict: setStoreField('levels'),
    addGroup,
    updateGroup,
    deleteGroup,
  },
});

export const { reducer: dictionariesReducer, actions } = dictionariesSlice;
