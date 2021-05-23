import { LabStatusEnum } from '@features/labs/types';

/**
 * Проверка статуса на соответствие статусу "open"
 *
 * @param status - статус лабораторной работы
 * @returns входящий статус равен "open" ?
 */
export const isOpenStatus = (status: LabStatusEnum): boolean =>
  status === LabStatusEnum.Open;

/**
 * Проверка статуса на соответствие статусу "onCheck"
 *
 * @param status - статус лабораторной работы
 * @returns входящий статус равен "onCheck ?
 */
export const onCheckStatus = (status: LabStatusEnum): boolean =>
  status === LabStatusEnum.OnCheck;

/**
 * Проверка статуса на соответствие статусу "onRevision"
 *
 * @param status - статус лабораторной работы
 * @returns входящий статус равен "onRevision" ?
 */
export const onRevisionStatus = (status: LabStatusEnum): boolean =>
  status === LabStatusEnum.OnRevision;

/**
 * Проверка статуса на соответствие статусу "completed"
 *
 * @param status - статус лабораторной работы
 * @returns входящий статус равен "completed ?
 */
export const isCompletedStatus = (status: LabStatusEnum): boolean =>
  status === LabStatusEnum.Completed;

export const utils = {
  isOpenStatus,
  onCheckStatus,
  onRevisionStatus,
  isCompletedStatus,
};
