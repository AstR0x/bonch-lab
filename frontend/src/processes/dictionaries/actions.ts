import { createAction } from '@reduxjs/toolkit';

/**
 * Экшен получения справочника групп
 */
const getGroupsDict = createAction('getGroupsDict');

/**
 * Экшен получения справочника тем
 */
const getTopicsDict = createAction('getTopicsDict');

export const actions = {
  getGroupsDict,
  getTopicsDict,
};
