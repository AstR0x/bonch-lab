import { Student } from '@features/auth';

export interface CreateGroupPayload {
  /** Название группы */
  name: string;
  /** Кодовое слово */
  codeword: string;
}

export interface UpdateGroupPayload extends CreateGroupPayload {
  /** Идентификатор группы */
  id: string;
}

export interface Group extends CreateGroupPayload {
  /** Идентификатор группы */
  id: string;
  /** Идентификаторы студентов */
  students: string[];
}

export interface OpenedGroup {
  /** Идентификатор группы */
  id: string;
  /** Название группы */
  name: string;
  /** Кодовое слово */
  codeword: string;
  /** Студенты группы */
  students: Student[];
}
