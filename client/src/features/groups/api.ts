import { AxiosPromise } from 'axios';

import { request } from '@common/utils';

import { Group, CreateGroupPayload, UpdateGroupPayload } from './types';

/**
 * Получение списка групп
 *
 * @returns axios промис
 */
const getGroupList = (): AxiosPromise<Group[]> =>
  request.get({ url: 'groups' });

/**
 * Получение группы
 *
 * @param id - идентификатор группы
 * @returns axios промис
 */
const getGroup = (id: string): AxiosPromise<Group> =>
  request.get({ url: `groups/${id}` });

/**
 * Создание группы
 *
 * @param createGroupPayload - данные группы
 * @returns axios промис
 */
const createGroup = (
  createGroupPayload: CreateGroupPayload,
): AxiosPromise<Group> =>
  request.post({ url: 'groups/create', data: createGroupPayload });

/**
 * Обновление группы
 *
 * @param id - идентификатор группы
 * @param groupPayload - новые данные группы
 * @returns axios промис
 */
const updateGroup = ({
  id,
  ...groupPayload
}: UpdateGroupPayload): AxiosPromise<Group> =>
  request.patch({ url: `groups/update/${id}`, data: groupPayload });

/**
 * Удаление группы
 *
 * @param id - идентификатор группы
 * @returns axios промис
 */
const deleteGroup = (id: string): AxiosPromise<Group> =>
  request.delete({ url: `groups/delete/${id}` });

export const api = {
  getGroupList,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
};
