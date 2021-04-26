import { AxiosInstance } from 'axios';

import { utils } from './utils';

/**
 * Создает перехватчик запросов, которые добавляет заголовок авторизации
 *
 * @param axiosInstance - экземпляр axios
 */
export const createRequestsInterceptor = (
  axiosInstance: AxiosInstance,
): void => {
  axiosInstance.interceptors.request.use((httpRequest) => ({
    ...httpRequest,
    headers: {
      ...httpRequest.headers,
      Authorization: `Bearer ${utils.getSessionToken()}` || '',
    },
  }));
};
