export interface Task {
  /** Идентификатор задачи */
  id: string;
  /** Идентификатор темы задачи */
  topic: number;
  /** Идентификатор подтемы задачи */
  subtopic: number;
  /** Идентификатор сложности задачи */
  level: number;
  /** Формулировка задачи */
  formulation: string;
  /** К задаче загружено приложение? */
  isAttachmentLoaded: boolean;
}

export type TaskParams = Omit<
  Task,
  'id' | 'formulation' | 'isAttachmentLoaded'
>;

export type GetTaskListParams = Partial<TaskParams>;

export interface CreateTaskPayload
  extends Omit<Task, 'id' | 'isAttachmentLoaded'> {
  /** Приложение к задаче */
  attachment?: File;
}

export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {
  /** Идентификатор задачи */
  id: string;
}
