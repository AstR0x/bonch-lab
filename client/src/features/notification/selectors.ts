import * as R from 'ramda';

import { RootState } from '@store';
import { config } from '@common/config';

import { INotificationState } from './ducks';

/**
 * Селектор модуля уведомлений
 */
const notificationModuleSelector = (state: RootState): INotificationState =>
  R.pathOr(null, [config.modules.notification], state);

export const selectors = {
  notificationModuleSelector,
};
