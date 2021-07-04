import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance } from 'axios';

interface HttpClientParams {
  url: string;
  config?: Omit<AxiosRequestConfig, 'url' | 'headers'>;
  version?: string;
  headers?: any;
}

interface HttpClientParamsWithData<T = any> extends HttpClientParams {
  config?: Omit<AxiosRequestConfig, 'url' | 'headers' | 'data'>;
  data?: T;
}

interface HttpClient {
  get<T = any>(params: HttpClientParams): AxiosPromise<T>;
  delete<T = any>(params: HttpClientParams): AxiosPromise<T>;
  head<T = any>(params: HttpClientParams): AxiosPromise<T>;
  post<T = any, D = any>(params: HttpClientParamsWithData<D>): AxiosPromise<T>;
  put<T = any, D = any>(params: HttpClientParamsWithData<D>): AxiosPromise<T>;
  patch<T = any, D = any>(params: HttpClientParamsWithData<D>): AxiosPromise<T>;
  axiosInstance: AxiosInstance;
}

/**
 * Метод создает и возращает объект axiosInstance
 *
 * @param baseURL - базовый урл
 * @returns объект AxiosInstance
 */
export const createHttpClient = (baseURL: string): HttpClient => {
  const axiosInstance = axios.create({ baseURL });

  /**
   * Метод для отправки GET-запроса
   *
   * @param url - урл эндпоинта для отправки запроса
   * @param config - настройки для запроса
   * @param headers - дополнительные заголовки
   * @returns Результат ответа от сервера
   */
  const get = <T = any>({
    url,
    config,
    headers = {},
  }: HttpClientParams): AxiosPromise<T> => {
    return axiosInstance.get<T>(`api/${url}`, {
      ...config,
      headers,
    });
  };

  /**
   * Метод для отправки DELETE-запроса
   *
   * @param url - URL эндпоинта для отправки запроса
   * @param config - Настройки для запроса
   * @param headers - Дополнительные заголовки
   * @returns Результат ответа от сервера
   */
  const deleteReq = <T = any>({
    url,
    config,
    headers = {},
  }: HttpClientParams): AxiosPromise<T> => {
    return axiosInstance.delete<T>(`api/${url}`, {
      ...config,
      headers,
    });
  };

  /**
   * Метод для отправки HEAD-запроса
   *
   * @param url - URL эндпоинта для отправки запроса
   * @param config - Настройки для запроса
   * @param headers - Дополнительные заголовки
   * @returns Результат ответа от сервера
   */
  const head = <T = any>({
    url,
    config,
    headers = {},
  }: HttpClientParams): AxiosPromise<T> => {
    return axiosInstance.head<T>(`api/${url}`, {
      ...config,
      headers,
    });
  };

  /**
   * Метод для отправки POST-запроса
   *
   * @param url - URL эндпоинта для отправки запроса
   * @param data - данные запроса
   * @param config - Настройки для запроса
   * @param headers - Дополнительные заголовки
   * @returns Результат ответа от сервера
   */
  const post = <T = any, D = any>({
    url,
    data,
    config,
    headers = {},
  }: HttpClientParamsWithData<D>): AxiosPromise<T> => {
    return axiosInstance.post<T>(`api/${url}`, data, {
      ...config,
      headers,
    });
  };

  /**
   * Метод для отправки PUT-запроса
   *
   * @param url - урл эндпоинта для отправки запроса
   * @param data - данные запроса
   * @param config - настройки для запроса
   * @param headers - дополнительные заголовки
   * @returns Результат ответа от сервера
   */
  const put = <T = any, D = any>({
    url,
    data,
    config,
    headers = {},
  }: HttpClientParamsWithData<D>): AxiosPromise<T> => {
    return axiosInstance.put<T>(`api/${url}`, data, {
      ...config,
      headers,
    });
  };

  /**
   * Метод для отправки PATCH-запроса
   *
   * @param url - урл эндпоинта для отправки запроса
   * @param data - данные запроса
   * @param config - настройки для запроса
   * @param headers - дополнительные заголовки
   * @returns Результат ответа от сервера
   */
  const patch = <T = any, D = any>({
    url,
    data,
    config,
    headers = {},
  }: HttpClientParamsWithData<D>): AxiosPromise<T> => {
    return axiosInstance.patch<T>(`api/${url}`, data, {
      ...config,
      headers,
    });
  };

  return {
    axiosInstance,
    get,
    delete: deleteReq,
    head,
    post,
    put,
    patch,
  };
};
