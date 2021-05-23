import { Student } from '@features/auth';

export interface Group {
  /** Идентификатор группы */
  id: string;
  /** Название группы */
  name: string;
  /** Кодовое слово */
  codeword: string;
  /** Идентификаторы студентов */
  students: string[];
}

export interface PopulatedGroup extends Omit<Group, 'students'> {
  /** Студенты группы */
  students: Student[];
}

export type CreateGroupPayload = Omit<Group, 'id' | 'students'>;

export type UpdateGroupPayload = Partial<Omit<Group, 'students'>>;
