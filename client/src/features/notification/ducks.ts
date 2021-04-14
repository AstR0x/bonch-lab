import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Color } from '@material-ui/lab';

import { config } from '@common/config';

export interface INotificationState {
  // Сообщение уведомления
  message: string;
  // Цвет уведомления
  severity: Color;
}

const initialState: INotificationState = null;

const showNotification = (
  _: INotificationState,
  { payload }: PayloadAction<INotificationState>,
): INotificationState => payload;

const hideNotification = (): INotificationState => initialState;

const notificationSlice = createSlice({
  name: config.modules.notification,
  initialState,
  reducers: {
    showNotification,
    hideNotification,
  },
});

export const notificationReducer = notificationSlice.reducer;

export const actions = {
  ...notificationSlice.actions,
};
