import { AxiosPromise } from 'axios';

import { request } from '@common/utils';

import { User } from './types';

/**
 * Удаление пользователя
 *
 * @param id - идентификатор пользователя
 * @returns axios промис c удалённым пользователем
 */
const deleteUser = (id: string): AxiosPromise<User> =>
  request.delete({ url: `users/delete/${id}` });

export const api = {
  deleteUser,
};
