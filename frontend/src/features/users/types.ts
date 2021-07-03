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
