import { createAction } from '@reduxjs/toolkit';

import { SignInPayload, SignUpPayload } from '@features/auth/types';

/**
 * Экшен авторизации пользователя
 */
const signIn = createAction<SignInPayload>('signIn');

/**
 * Экшен регистрации пользователя
 */
const signUp = createAction<SignUpPayload>('signUp');

/**
 * Экшен выхода из приложения
 */
const signOut = createAction('signOut');

/**
 * Экшен автоматической авторизации
 */
const autoSignIn = createAction('authSignIn');

export const actions = { signIn, signUp, signOut, autoSignIn };
