import shajs from 'sha.js';

import { RoleEnum } from '@features/auth/types';

import { SALT } from './constants';

/**
 * Устанавливает токен доступа в localStorage
 *
 * @param token - токен доступа
 */
const setSessionToken = (token: string): void =>
  localStorage.setItem('token', token);

/**
 * Получает токен доступа из localStorage
 *
 * @returns сессионные токены или null
 */
const getSessionToken = (): string | null => localStorage.getItem('token');

/**
 * Удаляет сессионный токен из localStorage
 */
const deleteSessionToken = (): void => localStorage.removeItem('token');

/**
 * Шифрование пароля
 *
 * @param password - пароль
 * @returns зашифрованный пароль
 */
const encodePassword = (password: string): string =>
  shajs('sha512')
    .update(SALT + password)
    .digest('hex');

/**
 * Возвращает true, если передана роль преподавателя
 *
 * @param role - роль пользователя
 * @returns role === teacher ?
 */
const isTeacher = (role: RoleEnum): boolean => role === RoleEnum.Teacher;

/**
 * Возвращает true, если передана роль студента
 *
 * @param role - роль пользователя
 * @returns role === student ?
 */
const isStudent = (role: RoleEnum): boolean => role === RoleEnum.Student;

export const utils = {
  setSessionToken,
  getSessionToken,
  deleteSessionToken,
  encodePassword,
  isTeacher,
  isStudent,
};
