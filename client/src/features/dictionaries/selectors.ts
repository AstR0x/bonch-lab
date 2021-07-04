import { createSelector } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { config } from '@common/config';
import { RootState } from '@store';

import { DictionariesState } from './ducks';
import { DictionaryItem, Structure } from './types';

/**
 * Селектор модуля справочников
 */
const dictionariesModuleSelector = (state: RootState): DictionariesState =>
  R.pathOr(null, [config.modules.dictionaries], state);

/**
 * Селектор справочника с группами
 */
const groupsDictSelector = createSelector(
  dictionariesModuleSelector,
  (dictionariesModule): DictionaryItem[] =>
    R.pathOr([], ['groups'], dictionariesModule),
);

/**
 * Селектор справочника с темами
 */
const topicsDictSelector = createSelector(
  dictionariesModuleSelector,
  (dictionariesModule): DictionaryItem[] =>
    R.pathOr([], ['topics'], dictionariesModule),
);

/**
 * Селектор справочников
 */
const dictsSelector = createSelector(
  groupsDictSelector,
  topicsDictSelector,
  (groups, topics) => ({ groups, topics }),
);

/**
 * Селектор структуры тем/подтем/уровней
 */
const structureSelector = createSelector(
  dictionariesModuleSelector,
  (tasksModule): Structure => R.pathOr(null, ['structure'], tasksModule),
);

export const selectors = {
  dictionariesModuleSelector,
  groupsDictSelector,
  topicsDictSelector,
  dictsSelector,
  structureSelector,
};
