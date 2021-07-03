export enum RoleEnum {
  Student = 'Студент',
  Teacher = 'Преподаватель',
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
