import { Lab } from '@features/labs';
import { RoleEnum } from '@features/auth';

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

export interface Student extends Omit<User, 'role'> {
  /** Академическая группа */
  group: string;
  /** Роль */
  role: RoleEnum.Student;
  /** Лабораторные работы */
  labs: Lab[];
}

export interface Teacher extends Omit<User, 'role'> {
  /** Роль */
  role: RoleEnum.Teacher;
}
