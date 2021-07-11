import { AuthorizationState } from '../ducks';
import { RoleEnum } from '../types';

/**
 * Начальные мок данные стора модуля auth
 */
export const initAuthState: AuthorizationState = {
  token: null,
  userData: null,
};

/**
 * Мок данные стора модуля auth
 */
export const authState: AuthorizationState = {
  token: 'token',
  userData: {
    id: 'id',
    name: 'Иван',
    surname: 'Сидоров',
    patronymic: 'Петрович',
    status: 'Подтвержден',
    role: 'Преподаватель' as RoleEnum.Teacher,
    email: 'teacher@gmail.com',
    regDate: '2021-05-27T15:48:45.615Z',
  },
};
