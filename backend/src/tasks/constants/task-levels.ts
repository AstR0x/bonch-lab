import { TaskLevelEnum } from '../enum';

export const TASK_LEVELS = {
  [TaskLevelEnum[TaskLevelEnum.Basic]]: {
    id: TaskLevelEnum.Basic,
    title: 'Базовый',
  },
  [TaskLevelEnum[TaskLevelEnum.Medium]]: {
    id: TaskLevelEnum.Medium,
    title: 'Средний',
  },
  [TaskLevelEnum[TaskLevelEnum.High]]: {
    id: TaskLevelEnum.High,
    title: 'Высокий',
  },
};
