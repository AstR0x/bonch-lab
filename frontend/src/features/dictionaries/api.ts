import { AxiosPromise } from 'axios';

import { request } from '@src/constants';

import { Dictionary } from './types';

/**
 * Получение справочника со списком групп
 *
 * @returns промис
 */
const getGroupListDict = (): AxiosPromise<Dictionary[]> =>
  request.get({ url: 'dictionaries/groups' });

/**
 * Получение справочника со списком тем
 *
 * @returns промис
 */
const getTopicListDict = (): AxiosPromise<Dictionary[]> =>
  request.get({ url: 'dictionaries/topics' });

export const api = {
  getGroupListDict,
  getTopicListDict,
};
