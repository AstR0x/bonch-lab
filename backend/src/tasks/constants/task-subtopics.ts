import { TaskSubtopicEnum } from '../enum';

export const TASK_SUBTOPICS = {
  [TaskSubtopicEnum[TaskSubtopicEnum.ArithmeticExpressions]]: {
    id: TaskSubtopicEnum.ArithmeticExpressions,
    title: 'Арифметические выражения',
  },
  [TaskSubtopicEnum[TaskSubtopicEnum.LogicalExpressions]]: {
    id: TaskSubtopicEnum.LogicalExpressions,
    title: 'Логические выражения',
  },
  [TaskSubtopicEnum[TaskSubtopicEnum.ConditionalStatements]]: {
    id: TaskSubtopicEnum.ConditionalStatements,
    title: 'Условные операторы',
  },
  [TaskSubtopicEnum[TaskSubtopicEnum.VariantSelectionOperator]]: {
    id: TaskSubtopicEnum.VariantSelectionOperator,
    title: 'Оператор выбора варианта',
  },
};
