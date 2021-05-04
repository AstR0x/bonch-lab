import moment from 'moment';

import { DATE_FORMAT } from '@src/constants';

/**
 * Возвращает форматированную дату
 *
 * @param date - дата
 * @returns форматированная дата
 */
export const getFormattedDate = (date?: string): string =>
  moment(date).format(DATE_FORMAT);
