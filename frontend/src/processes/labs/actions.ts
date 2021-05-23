import { createAction } from '@reduxjs/toolkit';

import { GetTaskListParams } from '@features/tasks';
import {
  UpdateLabStatusPayload,
  CreateCommentPayload,
  UploadReportPayload,
} from '@features/labs';

/**
 * Экшен получения списка лабораторных работ
 */
const getLabList = createAction<GetTaskListParams>('getLabList');

/**
 * Экшен получения лабораторной работы
 */
const getLab = createAction<string>('getLab');

/**
 * Экшен обновления статуса лабораторной работы
 */
const updateLabStatus = createAction<UpdateLabStatusPayload>('updateLabStatus');

/**
 * Экшен создания комментария к лабораторной работе
 */
const createComment = createAction<CreateCommentPayload>('createComment');

/**
 * Экшен загрузки отчёта лабораторной работы
 */
const uploadReport = createAction<UploadReportPayload>('uploadReport');

/**
 * Экшен скачивания отчёта лабораторной работы
 */
const downloadReport = createAction<string>('downloadReport');

export const actions = {
  getLabList,
  getLab,
  updateLabStatus,
  createComment,
  uploadReport,
  downloadReport,
};
