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
}

export type TaskParams = Omit<Task, 'id' | 'formulation'>;

export type GetTaskListParams = Partial<TaskParams>;

export type CreateTaskPayload = Omit<Task, 'id'>;

export type UpdateTaskPayload = Partial<Task>;
