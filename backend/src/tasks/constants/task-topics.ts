import { TaskTopicEnum } from '../enum';

export const TASK_TOPICS = {
  [TaskTopicEnum[TaskTopicEnum.LinearAlgorithms]]: {
    id: TaskTopicEnum.LinearAlgorithms,
    title: 'Линейные алгоритмы',
  },
  [TaskTopicEnum[TaskTopicEnum.BranchingAlgorithms]]: {
    id: TaskTopicEnum.BranchingAlgorithms,
    title: 'Разветвляющиеся алгоритмы',
  },
  [TaskTopicEnum[TaskTopicEnum.CyclicAlgorithms]]: {
    id: TaskTopicEnum.CyclicAlgorithms,
    title: 'Циклические алгоритмы',
  },
  [TaskTopicEnum[TaskTopicEnum.Arrays]]: {
    id: TaskTopicEnum.Arrays,
    title: 'Массивы',
  },
  [TaskTopicEnum[TaskTopicEnum.SpecialDataTypes]]: {
    id: TaskTopicEnum.SpecialDataTypes,
    title: 'Специальные типы данных',
  },
  [TaskTopicEnum[TaskTopicEnum.Files]]: {
    id: TaskTopicEnum.Files,
    title: 'Файлы',
  },
  [TaskTopicEnum[TaskTopicEnum.ObjectOrientedProgrammingElements]]: {
    id: TaskTopicEnum.ObjectOrientedProgrammingElements,
    title: 'Элементы ООП',
  },
};
