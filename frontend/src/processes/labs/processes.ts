import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, takeEvery, call } from 'redux-saga/effects';

import { processHandler } from '@common/sagas';
import { GetTaskListParams } from '@features/tasks';
import { notificationSagas } from '@features/notification';
import {
  labsSagas,
  UpdateLabStatusPayload,
  CreateCommentPayload,
  UploadReportPayload,
} from '@features/labs';

import { actions } from './actions';

/**
 * Процесс получения списка лабораторных работ
 *
 * @param getTaskListParams - параметры для получения лабораторных работ
 * @returns итератор
 */
function* getLabListProcess({
  payload: getTaskListParams,
}: PayloadAction<GetTaskListParams>): SagaIterator {
  yield call(processHandler, {
    process: labsSagas.getLabList,
    payload: getTaskListParams,
  });
}

/**
 * Процесс получения лабораторной работы
 *
 * @param id - идентификатор лабораторной работы
 * @returns итератор
 */
function* getLabProcess({ payload: id }: PayloadAction<string>): SagaIterator {
  yield call(processHandler, {
    process: labsSagas.getLab,
    payload: id,
  });
}

/**
 * Процесс обновления статуса лабораторной работы (без обработки)
 *
 * @param updateLabStatusPayload - новое данные лабораторной работы
 * @returns итератор
 */
function* notHandledUpdateLabStatusProcess(
  updateLabStatusPayload: UpdateLabStatusPayload,
): SagaIterator {
  // Обновляем статус лабораторной работы
  yield call(labsSagas.updateLab, updateLabStatusPayload);

  // Показываем уведомление о смене статуса
  yield call(
    notificationSagas.showWarningNotification,
    'Статус задачи изменён!',
  );
}

/**
 * Процесс обновления статуса лабораторной работы
 *
 * @param updateLabStatusPayload - новые данные лабораторной работы
 * @returns итератор
 */
function* updateLabStatusProcess({
  payload: updateLabStatusPayload,
}: PayloadAction<UpdateLabStatusPayload>): SagaIterator {
  yield call(processHandler, {
    process: notHandledUpdateLabStatusProcess,
    payload: updateLabStatusPayload,
  });
}

/**
 * Процесс создания комментария к лабораторной работе (без обработки)
 *
 * @param createCommentPayload - данные комментария
 * @returns итератор
 */
function* notHandledCreateCommentProcess(
  createCommentPayload: CreateCommentPayload,
): SagaIterator {
  // Создаём комментарий
  yield call(labsSagas.createComment, createCommentPayload);

  // Показываем уведомление об успешном создании комментария
  yield call(
    notificationSagas.showSuccessNotification,
    'Комментарий успешно добавлен!',
  );
}

/**
 * Процесс создания комментария к лабораторной работе
 *
 * @param createCommentPayload - данные комментария
 * @returns итератор
 */
function* createCommentProcess({
  payload: createCommentPayload,
}: PayloadAction<CreateCommentPayload>): SagaIterator {
  yield call(processHandler, {
    process: notHandledCreateCommentProcess,
    payload: createCommentPayload,
  });
}

/**
 * Процесс загрузки отчёта по лабораторной работе (без обработки)
 *
 * @param uploadReportPayload - данные отчёта
 * @returns итератор
 */
function* notHandledUploadReportProcess(
  uploadReportPayload: UploadReportPayload,
): SagaIterator {
  // Загружаем отчёт по лабораторной работе
  yield call(labsSagas.uploadReport, uploadReportPayload);

  // Показываем уведомление об успешной загрузке отчёта
  yield call(
    notificationSagas.showSuccessNotification,
    'Отчёт успешно загружен!',
  );
}

/**
 * Процесс загрузки отчёта по лабораторной работе
 *
 * @param uploadReportPayload - данные отчёта
 * @returns итератор
 */
function* uploadReportProcess({
  payload: uploadReportPayload,
}: PayloadAction<UploadReportPayload>): SagaIterator {
  yield call(processHandler, {
    process: notHandledUploadReportProcess,
    payload: uploadReportPayload,
  });
}

/**
 * Процесс скачивания отчёта по лабораторной работе
 *
 * @param id - идентификатор лабораторной работы
 * @returns итератор
 */
function* downloadReportProcess({
  payload: id,
}: PayloadAction<string>): SagaIterator {
  yield call(processHandler, {
    process: labsSagas.downloadReport,
    payload: id,
  });
}

/**
 * Вотчер лабораторных работ
 */
export function* labsProcessWatcher(): SagaIterator {
  yield all([
    takeEvery(actions.getLabList, getLabListProcess),
    takeEvery(actions.getLab, getLabProcess),
    takeEvery(actions.updateLabStatus, updateLabStatusProcess),
    takeEvery(actions.createComment, createCommentProcess),
    takeEvery(actions.uploadReport, uploadReportProcess),
    takeEvery(actions.downloadReport, downloadReportProcess),
  ]);
}
