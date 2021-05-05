import { pathOr } from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { RootState } from '@store';

import { utils } from './utils';
import { DictionariesState } from './ducks';
import { DictionaryItem } from './types';

/**
 * Возвращает стор модуля справочников
 *
 * @param state - состояние хранилища
 * @returns данные модуля справочников
 */
const dictionariesModuleSelector = (state: RootState): DictionariesState =>
  pathOr(null, [config.modules.dictionaries], state);

/**
 * Возвращает справочник с группами
 *
 * @param state - состояние хранилища
 * @returns группы
 */
const groupsDictSelector = createSelector(
  dictionariesModuleSelector,
  (dictionariesModule): DictionaryItem[] =>
    pathOr([], ['groups'], dictionariesModule),
);

/**
 * Возвращает справочник с темами
 *
 * @param state - состояние хранилища
 * @returns темы
 */
const topicsDictSelector = createSelector(
  dictionariesModuleSelector,
  (dictionariesModule): DictionaryItem[] =>
    pathOr([], ['topics'], dictionariesModule),
);

/**
 * Возвращает справочник с подтемами
 *
 * @param state - состояние хранилища
 * @returns подтемы
 */
const subtopicsDictSelector = createSelector(
  dictionariesModuleSelector,
  (dictionariesModule): DictionaryItem[] =>
    pathOr([], ['subtopics'], dictionariesModule),
);

/**
 * Возвращает справочник с уровнями сложности
 *
 * @param state - состояние хранилища
 * @returns уровни сложности
 */
const levelsDictSelector = createSelector(
  dictionariesModuleSelector,
  (dictionariesModule): DictionaryItem[] =>
    pathOr([], ['levels'], dictionariesModule),
);

/**
 * Возвращает объект со справочниками
 *
 * @param state - состояние хранилища
 * @returns объект со справочниками
 */
const dictsSelector = createSelector(
  groupsDictSelector,
  topicsDictSelector,
  subtopicsDictSelector,
  levelsDictSelector,
  (groups, topics, subtopics, levels) => ({
    groups,
    topics,
    subtopics,
    levels,
  }),
);

/**
 * Возвращает объект со справочниками-объектами
 *
 * @param state - состояние хранилища
 * @returns справочники-объекты
 */
const dictObjectsSelector = createSelector(
  topicsDictSelector,
  subtopicsDictSelector,
  levelsDictSelector,
  (topics, subtopics, levels) => ({
    topics: utils.dictionaryToObject(topics),
    subtopics: utils.dictionaryToObject(subtopics),
    levels: utils.dictionaryToObject(levels),
  }),
);

export const selectors = {
  dictionariesModuleSelector,
  groupsDictSelector,
  topicsDictSelector,
  subtopicsDictSelector,
  levelsDictSelector,
  dictsSelector,
  dictObjectsSelector,
};
