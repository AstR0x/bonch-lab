import { User, Student } from '@features/users';
import { Task } from '@features/tasks';

export enum LabStatusEnum {
  /** Открыта */
  Open = 'open',
  /** На проверке */
  OnCheck = 'onCheck',
  /** На доработке */
  OnRevision = 'onRevision',
  /** Выполнено */
  Completed = 'completed',
}

export interface Lab {
  /** Идентификатор лабораторной работы */
  id: string;
  /** Задача  */
  task: Task;
  /** Статус */
  status: LabStatusEnum;
  /** Идентификатор исполнителя */
  executor: string;
  /** Комментарии к лабораторной работе */
  comments: Comment[];
  /** Отчёт загружен ? */
  isReportLoaded: boolean;
}

export interface PopulatedLab extends Omit<Lab, 'executor' | 'comments'> {
  /** Исполнитель */
  executor: Student;
  /** Комментарии к лабораторной работе */
  comments: PopulatedComment[];
}

export interface Comment<T = string> {
  /** Идентификатор комментария */
  id: string;
  /** Сообщение комментария */
  message: string;
  /** Дата создания комментария */
  creationDate: string;
  /** Автор комментария */
  author: T;
}

export type PopulatedComment = Comment<User>;

export type UpdateLabPayload = Partial<Lab>;

export type UpdateLabStatusPayload = Pick<UpdateLabPayload, 'id' | 'status'>;

export interface UploadReportPayload {
  /** Идентификатор лабораторной работы */
  id: string;
  /** Файл отчёта */
  report: File;
}

export interface CreateCommentPayload {
  /** Идентификатор лабораторной работы */
  id: string;
  /** Сообщение комментария */
  message: string;
}
