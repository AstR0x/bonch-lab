import { Lab } from '@features/labs';

export enum RoleEnum {
  Student = 'Студент',
  Teacher = 'Преподаватель',
}

export interface User {
  /** Идентификатор пользователя */
  id: string;
  /** Имя пользователя */
  name: string;
  /** Фамилия пользователя */
  surname: string;
  /** Отчество пользователя */
  patronymic: string;
  /** Статус пользователя */
  status: string;
  /** Роль пользователя */
  role: RoleEnum;
  /** Почта пользователя */
  email: string;
  /** Дата регистрации */
  regDate: string;
}

export interface Student extends User {
  /** Академическая группа */
  group: string;
  /** Роль */
  role: RoleEnum.Student;
  /** Лабораторные работы */
  labs: Lab[];
}

export interface Teacher extends User {
  /** Роль */
  role: RoleEnum.Teacher;
}

export interface SignInPayload {
  /** Почта пользователя */
  email: string;
  /** Пароль пользователя */
  password: string;
}

export interface SignUpPayload {
  /** Кодовое слово */
  codeword: string;
  /** Имя пользователя */
  name: string;
  /** Фамилия пользователя */
  surname: string;
  /** Отчество пользователя */
  patronymic: string;
  /** Роль пользователя */
  role: RoleEnum;
  /** Академическая группа */
  group?: string;
  /** Почта пользователя */
  email: string;
  /** Пароль пользователя */
  password: string;
}
