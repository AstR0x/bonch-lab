import { AxiosPromise } from 'axios';

import { request } from '@src/constants';

import { SignInPayload, SignUpPayload } from './types';

/**
 * Регистрация пользователя
 *
 * @param data - тело запроса
 * @returns axios промис
 */
const signUp = (data: SignUpPayload): AxiosPromise<boolean> =>
  request.post({ url: 'auth/sign-up', data });

/**
 * Авторизация пользователя
 *
 * @param data - тело запроса
 * @returns axios промис
 */
const signIn = (data: SignInPayload): AxiosPromise<string> =>
  request.post({ url: 'auth/sign-in', data });

export const api = { signUp, signIn };