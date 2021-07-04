import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, takeEvery, call } from 'redux-saga/effects';

import { processHandler } from '@common/sagas';
import { notificationSagas } from '@features/notification';
import { userSagas } from '@features/users';

import { actions } from './actions';

/**
 * Процесс удаления студента (без обработки)
 *
 * @returns итератор
 */
function* notHandledDeleteStudentProcess(id: string): SagaIterator {
  yield call(userSagas.deleteStudent, id);

  yield call(
    notificationSagas.showSuccessNotification,
    'Студент успешно удален!',
  );
}

/**
 * Процесс удаления студента
 *
 * @param id - идентификатор пользователя
 * @returns итератор
 */
function* deleteStudentProcess({
  payload: id,
}: PayloadAction<string>): SagaIterator {
  yield call(processHandler, {
    process: notHandledDeleteStudentProcess,
    payload: id,
  });
}

/**
 * Вотчер пользователей
 */
export function* usersProcessWatcher(): SagaIterator {
  yield all([takeEvery(actions.deleteStudent, deleteStudentProcess)]);
}
