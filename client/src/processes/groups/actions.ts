import { createAction } from '@reduxjs/toolkit';

import { CreateGroupPayload, UpdateGroupPayload } from '@features/groups';

/**
 * Экшен получения списка групп
 */
const getGroupList = createAction('getGroupList');

/**
 * Экшен получения одной группы
 */
const getGroup = createAction<string>('getGroup');

/**
 * Экшен создания группы
 */
const createGroup = createAction<CreateGroupPayload>('createGroup');

/**
 * Экшен обновления группы
 */
const updateGroup = createAction<UpdateGroupPayload>('updateGroup');

/**
 * Экшен удаления группы
 */
const deleteGroup = createAction<string>('deleteGroup');

export const actions = {
  getGroupList,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
};
