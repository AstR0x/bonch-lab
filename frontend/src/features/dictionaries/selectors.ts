import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { RootState } from '@store';

import { DictionariesState } from './ducks';
import { Dictionary } from './types';

/**
 * Возвращает стор модуля справочников
 *
 * @param state - состояние хранилища
 * @returns данные модуля справочников
 */
const dictionariesModuleSelector = (state: RootState): DictionariesState =>
  pathOr(null, [config.modules.dictionaries], state);

/**
 * Возвращает справочник со списком групп
 *
 * @param state - состояние хранилища
 * @returns список групп
 */
const groupListDictSelector = createSelector(
  dictionariesModuleSelector,
  (dictionariesModule): Dictionary[] =>
    pathOr(null, ['groupList'], dictionariesModule),
);

/**
 * Возвращает справочник со списком тем
 *
 * @param state - состояние хранилища
 * @returns список тем
 */
const topicListDictSelector = createSelector(
  dictionariesModuleSelector,
  (dictionariesModule): Dictionary[] =>
    pathOr(null, ['topicList'], dictionariesModule),
);

export const selectors = {
  dictionariesModuleSelector,
  groupListDictSelector,
  topicListDictSelector,
};
