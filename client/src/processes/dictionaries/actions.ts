import { createAction } from '@reduxjs/toolkit';

/**
 * Экшен получения справочника групп
 */
const getGroupsDict = createAction('getGroupsDict');

/**
 * Экшен получения справочника тем
 */
const getTopicsDict = createAction('getTopicsDict');

/**
 * Экшен получения структуры тем/подтем/уровней
 */
const getStructure = createAction('getStructure');

export const actions = {
  getGroupsDict,
  getTopicsDict,
  getStructure,
};
