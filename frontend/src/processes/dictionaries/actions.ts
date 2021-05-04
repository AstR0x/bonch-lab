import { createAction } from '@reduxjs/toolkit';

/**
 * Экшен получения справочника со списком групп
 */
const getGroupListDict = createAction('getGroupListDict');

/**
 * Экшен получения справочника со списком тем
 */
const getTopicListDict = createAction('getTopicListDict');

export const actions = {
  getGroupListDict,
  getTopicListDict,
};
