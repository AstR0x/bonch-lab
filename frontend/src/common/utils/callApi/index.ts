import { AxiosPromise } from 'axios';
import { call } from 'redux-saga/effects';
import * as R from 'ramda';

import { ServerError } from '@features/errors';

/**
 * Обертка над функцией отправки API запроса
 *
 * @param command - метод вызова API
 * @param params - параметры команды
 * @param pathData - путь к данным для выдачи данных
 * @param pathError - путь к данными для получения текста ошибки
 * @returns ответ от сервера или выбросится ошибка
 */
export function* callApi(
  command: (...args: any[]) => AxiosPromise,
  params: any[] = [],
  pathData = ['data'],
  pathError = ['response', 'data'],
) {
  try {
    const response = yield call(command, ...params);
    return R.pathOr(null, pathData, response);
  } catch (error) {
    console.error(error);
    const { message, statusCode } = R.pathOr(null, pathError, error);
    throw new ServerError(message, statusCode);
  }
}
