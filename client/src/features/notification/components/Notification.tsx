import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { isNil } from 'ramda';

import { selectors as notificationSelectors } from '../selectors';
import { actions as notificationActions } from '../ducks';

export const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const notification = useSelector(notificationSelectors.notificationSelector);
  const isOpened = !isNil(notification);

  /**
   * Диспатчит экшен закрытия уведомления
   *
   * @param _ - событие клика
   * @param reason - причина закрытия уведомления
   */
  const closeNotification = (_: React.SyntheticEvent, reason?: string) => {
    // Не закрываем уведомление при клике по любому месту
    if (reason !== 'clickaway') {
      dispatch(notificationActions.hideNotification());
    }
  };

  return (
    <Snackbar
      open={isOpened}
      autoHideDuration={5000}
      transitionDuration={0}
      onClose={closeNotification}
    >
      <Alert
        variant="filled"
        severity={notification?.severity}
        onClose={closeNotification}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};
