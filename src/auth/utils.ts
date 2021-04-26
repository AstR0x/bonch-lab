import * as moment from 'moment';

/**
 * Проверяет срок годность токена
 * 
 * @param exp время протухания токена
 */
export const isExpiredToken = (exp: number) => {
  const currentTime = moment.now()
  
  return moment(exp).isBefore(currentTime);
}
