import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { saveAs } from 'file-saver';

import { callApi } from '@common/utils';
import { GetTaskListParams } from '@features/tasks';

import { api } from './api';
import { actions } from './ducks';
import {
  UpdateLabPayload,
  CreateCommentPayload,
  UploadReportPayload,
} from './types';

/**
 * Получение списка лабораторных работ
 *
 * @param getTaskListParams - параметры для получения списка лабораторных работ
 * @returns итератор
 */
function* getLabList(getTaskListParams?: GetTaskListParams): SagaIterator {
  const labList = yield call(callApi, api.getLabList, [getTaskListParams]);

  yield put(actions.setLabList(labList));
}

/**
 * Получение лабораторной работы
 *
 * @param id - идентификатор лабораторной работы
 * @returns итератор
 */
function* getLab(id: string): SagaIterator {
  const lab = yield call(callApi, api.getLab, [id]);

  yield put(actions.setLab(lab));
}

/**
 * Обновление лабораторной работы
 *
 * @param updateLabPayload - новые данные лабораторной работы
 * @returns итератор
 */
function* updateLab(updateLabPayload: UpdateLabPayload): SagaIterator {
  const updatedLab = yield call(callApi, api.updateLab, [updateLabPayload]);

  yield put(actions.setLab(updatedLab));
}

/**
 * Создание комментария к лабораторной работе
 *
 * @param createCommentPayload - данные комментария
 * @returns итератор
 */
function* createComment(
  createCommentPayload: CreateCommentPayload,
): SagaIterator {
  const updatedLab = yield call(callApi, api.createComment, [
    createCommentPayload,
  ]);

  yield put(actions.setLab(updatedLab));
}

/**
 * Загрузка отчёта по лабораторной работе
 *
 * @param uploadReportPayload - данные отчёта
 * @returns итератор
 */
function* uploadReport(uploadReportPayload: UploadReportPayload): SagaIterator {
  const { id, report } = uploadReportPayload;

  const updatedLab = yield call(callApi, api.uploadReport, [id, report]);

  yield put(actions.setLab(updatedLab));
}

/**
 * Скачивание отчёта по лабораторной работе
 *
 * @param id - идентификатор лабораторной работы
 * @returns итератор
 */
function* downloadReport(id: string): SagaIterator {
  const data = yield call(callApi, api.downloadReport, [id]);

  yield call(saveAs, new Blob([data]), 'Отчёт по лабораторной работе.docx');
}

export const sagas = {
  getLabList,
  getLab,
  updateLab,
  createComment,
  uploadReport,
  downloadReport,
};
