import { createAction } from '@reduxjs/toolkit';

/**
 * Экшен для запуска процесса инициализации приложения
 */
const initApp = createAction('initApp');

export const actions = {
  initApp,
};
