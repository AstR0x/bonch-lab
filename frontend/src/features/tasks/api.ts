import { AxiosPromise } from 'axios';

import { request } from '@src/constants';

import {
  Task,
  GetTaskListParams,
  CreateTaskPayload,
  UpdateTaskPayload,
} from './types';

/**
 * Получение списка задач
 *
 * @param params - параметры для получения списка задач
 * @returns axios промис
 */
const getTaskList = (params?: GetTaskListParams): AxiosPromise<Task[]> =>
  request.get({ url: 'tasks', config: { params } });

/**
 * Получение задачи
 *
 * @param id - идентификатор задачи
 * @returns axios промис
 */
const getTask = (id: string): AxiosPromise<Task> =>
  request.get({ url: `tasks/${id}` });

/**
 * Создание задачи
 *
 * @param createTaskPayload - данные задачи
 * @returns axios промис
 */
const createTask = (
  createTaskPayload: CreateTaskPayload,
): AxiosPromise<Task> => {
  const formData = new FormData();

  formData.append('topic', createTaskPayload.topic.toString());
  formData.append('subtopic', createTaskPayload.subtopic.toString());
  formData.append('level', createTaskPayload.level.toString());
  formData.append('formulation', createTaskPayload.formulation);
  formData.append('attachment', createTaskPayload.attachment);

  return request.post({ url: 'tasks/create', data: formData });
};

/**
 * Обновление задачи
 *
 * @param id - идентификатор задачи
 * @param taskPayload - новые данные задачи
 * @returns axios промис
 */
const updateTask = ({
  id,
  ...taskPayload
}: UpdateTaskPayload): AxiosPromise<Task> => {
  const formData = new FormData();

  formData.append('topic', taskPayload.topic.toString());
  formData.append('subtopic', taskPayload.subtopic.toString());
  formData.append('level', taskPayload.level.toString());
  formData.append('formulation', taskPayload.formulation);
  formData.append('attachment', taskPayload.attachment);

  return request.patch({ url: `tasks/update/${id}`, data: formData });
};

/**
 * Удаление задачи
 *
 * @param id - идентификатор задачи
 * @returns axios промис
 */
const deleteTask = (id: string): AxiosPromise<Task> =>
  request.delete({ url: `tasks/delete/${id}` });

/**
 * Скачивание приложения к задаче
 *
 * @param id - идентификатор задачи
 * @returns axios промис
 */
const downloadTaskAttachment = (id: string): AxiosPromise<BlobPart> => {
  return request.get({
    url: `tasks/${id}/attachment/download`,
    config: { responseType: 'arraybuffer' },
  });
};

export const api = {
  getTaskList,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  downloadTaskAttachment,
};
