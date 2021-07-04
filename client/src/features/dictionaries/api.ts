import { AxiosPromise } from 'axios';

import { request } from '@src/constants';

import { DictionaryItem, Structure } from './types';

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
 * Получение структуры тем/подтем/уровней
 *
 * @returns axios промис
 */
const getStructure = (): AxiosPromise<Structure> =>
  request.get({ url: 'dictionaries/structure' });

export const api = {
  getGroupsDict,
  getTopicsDict,
  getStructure,
};
