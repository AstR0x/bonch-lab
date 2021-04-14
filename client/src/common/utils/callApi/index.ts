import { pathOr } from 'ramda';
import { AxiosPromise } from 'axios';
import { call } from 'redux-saga/effects';

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
  pathError = ['response', 'data', 'message'],
) {
  try {
    const response = yield call(command, ...params);
    return pathOr(null, pathData, response);
  } catch (error) {
    const errorMessage = pathOr(null, pathError, error);
    throw new Error(errorMessage);
  }
}
