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
  // Страница "Группа"
  GROUP_PAGE: '/group/:id',
  // Страница "Журнал успеваемости группы"
  GRADE_BOOK_PAGE: '/grade-book/:id',
  // Страница "Создание группы"
  CREATE_GROUP_PAGE: '/group/create',
  // Страница "Редактирование группы"
  EDIT_GROUP_PAGE: '/group/edit/:id',
  // Страница "Задачи по теме"
  TASKS_PAGE: '/tasks/topic/:id',
  // Страница "Создание задачи"
  CREATE_TASK_PAGE: '/task/create',
  // Страница "Редактирование задачи"
  EDIT_TASK_PAGE: '/task/edit/:id',
  // Страница "Лабораторные работы по теме"
  LABS_PAGE: '/labs/topic/:id',
  // Страница "Лабораторная работа"
  LAB_PAGE: '/lab/:id',
};

/**
 * Формат даты, используемый в проекте
 */
export const DATE_FORMAT = 'DD.MM.YYYY';
