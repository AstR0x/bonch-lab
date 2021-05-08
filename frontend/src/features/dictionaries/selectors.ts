import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { RootState } from '@store';

import { DictionariesState } from './ducks';
import { DictionaryItem } from './types';

/**
 * Селектор модуля справочников
 */
const dictionariesModuleSelector = (state: RootState): DictionariesState =>
  pathOr(null, [config.modules.dictionaries], state);

/**
 * Селектор справочника с группами
 */
const groupsDictSelector = createSelector(
  dictionariesModuleSelector,
  (dictionariesModule): DictionaryItem[] =>
    pathOr([], ['groups'], dictionariesModule),
);

/**
 * Селектор справочника с темами
 */
const topicsDictSelector = createSelector(
  dictionariesModuleSelector,
  (dictionariesModule): DictionaryItem[] =>
    pathOr([], ['topics'], dictionariesModule),
);

/**
 * Селектор справочников
 */
const dictsSelector = createSelector(
  groupsDictSelector,
  topicsDictSelector,
  (groups, topics) => ({ groups, topics }),
);

export const selectors = {
  dictionariesModuleSelector,
  groupsDictSelector,
  topicsDictSelector,
  dictsSelector,
};
