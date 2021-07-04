import { LabStatusEnum } from './types';

export const LAB_STATUS_TITLES = {
  [LabStatusEnum.Open]: 'Открыта',
  [LabStatusEnum.OnCheck]: 'На проверке',
  [LabStatusEnum.OnRevision]: 'На доработке',
  [LabStatusEnum.Completed]: 'Выполнена',
};

export const LAB_STATUS_DESIGNATIONS = {
  [LabStatusEnum.Open]: '',
  [LabStatusEnum.OnCheck]: 'П',
  [LabStatusEnum.OnRevision]: 'Д',
  [LabStatusEnum.Completed]: '+',
};
