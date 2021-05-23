import { AxiosPromise } from 'axios';

import { request } from '@src/constants';

import { SignInPayload, SignUpPayload } from './types';

/**
 * Регистрация пользователя
 *
 * @param data - данные регистрации
 * @returns axios промис
 */
const signUp = (data: SignUpPayload): AxiosPromise<boolean> =>
  request.post({ url: 'auth/sign-up', data });

/**
 * Авторизация пользователя
 *
 * @param data - данные авторизации
 * @returns axios промис
 */
const signIn = (data: SignInPayload): AxiosPromise<string> =>
  request.post({ url: 'auth/sign-in', data });

/**
 * Выход из приложения
 *
 * @returns axios промис
 */
const signOut = (): AxiosPromise<boolean> =>
  request.get({ url: 'auth/sign-out' });

export const api = { signUp, signIn, signOut };
