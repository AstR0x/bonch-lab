import { createHttpClient } from '@common/utils';

export const request = createHttpClient('http://localhost:5000');

/**
 * Объект с адресами страниц
 */
export const PATHS = {
  // Главная страница
  HOME_PAGE: '/',
  // Страница "Авторизация"
  AUTHORIZATION_PAGE: '/authorization',
  // Страница "Регистрация"
  REGISTRATION_PAGE: '/registration',
  // Страница "Восстановление пароля"
  PASSWORD_RECOVERY_PAGE: '/recovery',
  // Страница "Группа"
  GROUP_PAGE: '/group/:id',
  // Страница "Создание группы"
  CREATE_GROUP_PAGE: '/group/create',
  // Страница "Редактирование группы"
  EDIT_GROUP_PAGE: '/group/edit/:id',
  // Страница "Тема"
  TOPIC_PAGE: '/topics/:id',
  // Страница "О сайте"
  ABOUT_PAGE: '/about',
};

/**
 * Формат даты, используемый в проекте
 */
export const DATE_FORMAT = 'DD.MM.YYYY';