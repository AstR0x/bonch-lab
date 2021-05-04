import { pathOr } from 'ramda';

import { RootState } from '@store';
import { config } from '@common/config';

import { INotificationState } from './ducks';

const notificationModuleSelector = (state: RootState): INotificationState =>
  pathOr(null, [config.modules.notification], state);

export const selectors = {
  notificationModuleSelector,
};
