import { createAction } from '@reduxjs/toolkit';

/**
 * Экшн для запуска процесса инициализации приложения
 */
const initApp = createAction('initApp');

export const actions = {
  initApp,
};
