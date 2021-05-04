import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';

export type ErrorsState = {
  /** Заглавие ошибки */
  title: string;
  /** Сообщение ошибки */
  message: string;
  /** Код ошибки */
  code?: string;
} | null;

const initialState: ErrorsState = null;

/**
 * Обработчик установки ошибки
 *
 * @param state - Текущее состояние глобальных ошибок
 * @param payload - Объект описывающий ошибку
 *
 * @returns Новый стейт модуля errors
 */
const setError = (
  state: ErrorsState,
  {
    payload: { title, message, code = '' },
  }: PayloadAction<NonNullable<ErrorsState>>,
): ErrorsState => ({
  title,
  message,
  code,
});

/**
 * Сброс состояния до начального
 *
 * @returns Значение по умолчанию для модуля errors
 */
const clearError = (): ErrorsState => initialState;

const errorsSlice = createSlice({
  name: config.modules.errors,
  initialState,
  reducers: {
    setError,
    clearError,
  },
});

export const { reducer: errorsReducer, actions } = errorsSlice;
