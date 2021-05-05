import { AxiosPromise } from 'axios';

import { request } from '@src/constants';

import { DictionaryItem } from './types';

/**
 * Получение справочника групп
 *
 * @returns промис
 */
const getGroupsDict = (): AxiosPromise<DictionaryItem[]> =>
  request.get({ url: 'dictionaries/groups' });

/**
 * Получение справочника тем
 *
 * @returns промис
 */
const getTopicsDict = (): AxiosPromise<DictionaryItem[]> =>
  request.get({ url: 'dictionaries/topics' });

/**
 * Получение справочника подтем
 *
 * @returns промис
 */
const getSubtopicsDict = (): AxiosPromise<DictionaryItem[]> =>
  request.get({ url: 'dictionaries/subtopics' });

/**
 * Получение справочника уровней сложности
 *
 * @returns промис
 */
const getLevelsDict = (): AxiosPromise<DictionaryItem[]> =>
  request.get({ url: 'dictionaries/levels' });

export const api = {
  getGroupsDict,
  getTopicsDict,
  getSubtopicsDict,
  getLevelsDict,
};
