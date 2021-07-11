import { AxiosPromise } from 'axios';

import { request, createFormData } from '@common/utils';
import { GetTaskListParams } from '@features/tasks';

import { Lab, UpdateLabPayload, CreateCommentPayload } from './types';

/**
 * Получение списка лабораторных работ
 *
 * @param params - параметры для получения списка лабораторных работ
 * @returns axios промис
 */
const getLabList = (params?: GetTaskListParams): AxiosPromise<Lab[]> =>
  request.get({ url: 'labs', config: { params } });

/**
 * Получение лабораторной работы
 *
 * @param id - идентификатор лабораторной работы
 * @returns axios промис
 */
const getLab = (id: string): AxiosPromise<Lab> =>
  request.get({ url: `labs/${id}` });

/**
 * Обновление лабораторной работы
 *
 * @param id - идентификатор лабораторной работы
 * @param labPayload - новые данные лабораторной работы
 * @returns axios промис
 */
const updateLab = ({
  id,
  ...labPayload
}: UpdateLabPayload): AxiosPromise<Lab> =>
  request.patch({ url: `labs/update/${id}`, data: labPayload });

/**
 * Создание комментария к лабораторной работе
 *
 * @param id - идентификатор лабораторной работы
 * @param commentPayload - данные комментария
 * @returns axios промис
 */
const createComment = ({
  id,
  ...commentPayload
}: CreateCommentPayload): AxiosPromise<Lab> =>
  request.post({ url: `labs/${id}/comments/create`, data: commentPayload });

/**
 * Загрузка отчёта по лабораторной работе
 *
 * @param id - идентификатор лабораторной работы
 * @param report - файл отчёта по лабораторной работе
 * @returns axios промис
 */
const uploadReport = (id: string, report: File): AxiosPromise<Lab> => {
  const formData = createFormData({ report });

  return request.post({ url: `labs/${id}/report/upload`, data: formData });
};

/**
 * Скачивание отчёта по лабораторной работе
 *
 * @param id - идентификатор лабораторной работы
 * @returns axios промис
 */
const downloadReport = (id: string): AxiosPromise<BlobPart> => {
  return request.get({
    url: `labs/${id}/report/download`,
    config: { responseType: 'arraybuffer' },
  });
};

export const api = {
  getLabList,
  getLab,
  updateLab,
  createComment,
  uploadReport,
  downloadReport,
};
