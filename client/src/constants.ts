import { createHttpClient } from '@common/utils';

export const request = createHttpClient('http://localhost:5000');

/**
 * Объект с адресами страниц
 */
export const URLS = {
  // Страница "Авторизация"
  AUTHORIZATION_PAGE: '/authorization',
  // Страница "Регистрация"
  REGISTRATION_PAGE: '/registration',
  // Страница "Восстановление пароля"
  PASSWORD_RECOVERY_PAGE: './recovery',
  // Страница "О сайте"
  ABOUT_PAGE: '/about',
};
