export interface Task {
  /** Идентификатор задачи */
  id: string;
  /** Идентификатор темы задачи */
  topic: string;
  /** Идентификатор подтемы задачи */
  subtopic: string;
  /** Идентификатор сложности задачи */
  level: string;
  /** Формулировка задачи */
  formulation: string;
}

export type GetTaskListParams = Partial<Omit<Task, 'id' | 'formulation'>>;

export type CreateTaskPayload = Omit<Task, 'id'>;

export type UpdateTaskPayload = Partial<Task>;
