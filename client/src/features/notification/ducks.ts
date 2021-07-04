import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Color } from '@material-ui/lab';

import { config } from '@common/config';

export interface INotificationState {
  /** Сообщение уведомления */
  message: string;
  /** Цвет уведомления */
  severity: Color;
}

const initialState: INotificationState = null;

/**
 * Показ уведомления
 *
 * @param _ - состояние стора модуля
 * @param payload - данные уведомления
 */
const showNotification = (
  _: INotificationState,
  { payload }: PayloadAction<INotificationState>,
): INotificationState => payload;

/**
 * Скрытие уведомления
 */
const hideNotification = (): INotificationState => initialState;

const notificationSlice = createSlice({
  name: config.modules.notification,
  initialState,
  reducers: {
    showNotification,
    hideNotification,
  },
});

export const { reducer: notificationReducer, actions } = notificationSlice;
