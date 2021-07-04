import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { isNil } from 'ramda';

import { actions } from '../ducks';
import { selectors } from '../selectors';

/**
 * Компонент "Уведомление"
 *
 * @returns react-элемент
 */
export const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectors.notificationModuleSelector);
  const isOpened = !isNil(notification);

  /**
   * Диспатчит экшен закрытия уведомления
   *
   * @param _ - событие клика
   * @param reason - причина закрытия уведомления
   */
  const closeNotification = (_: React.SyntheticEvent, reason?: string) => {
    // Закрываем уведомление только по клику на крестик
    if (reason !== 'clickaway') {
      dispatch(actions.hideNotification());
    }
  };

  return (
    <Snackbar
      open={isOpened}
      autoHideDuration={3000}
      transitionDuration={0}
      onClose={closeNotification}
    >
      <Alert severity={notification?.severity} onClose={closeNotification}>
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};
