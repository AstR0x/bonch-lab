import { PATHS } from '@src/constants';
import { history } from '@store';

/**
 * Переход на главную страницу
 */
const goToHomePage = (): void => history.push(PATHS.HOME_PAGE);

/**
 * Переход на страницу "Авторизация"
 */
const goToAuthorizationPage = (): void =>
  history.push(PATHS.AUTHORIZATION_PAGE);

/**
 * Переход на страницу "Группа"
 *
 * @param groupId - идентификатор группы
 */
const goToGroupPage = (groupId: string): void =>
  history.push(PATHS.GROUP_PAGE.replace(':id', groupId));

/**
 * Переход на страницу "Создание группы"
 */
const goToCreateGroupPage = (): void => history.push(PATHS.CREATE_GROUP_PAGE);

/**
 * Переход на страницу "Редактирование группы"
 *
 * @param groupId - идентификатор группы
 */
const goToEditGroupPage = (groupId: string): void =>
  history.push(PATHS.EDIT_GROUP_PAGE.replace(':id', groupId));

/**
 * Переход на страницу "Журнал успеваемости группы"
 *
 * @param groupId - идентификатор группы
 */
const goToGradeBookPage = (groupId: string): void =>
  history.push(PATHS.GRADE_BOOK_PAGE.replace(':id', groupId));

/**
 * Переход на страницу "Задачи по теме"
 */
const goToTasksPage = (topicId: string): void =>
  history.push(PATHS.CREATE_TASK_PAGE.replace(':id', topicId));

/**
 * Переход на страницу "Создание задачи"
 */
const goToCreateTaskPage = (): void => history.push(PATHS.CREATE_TASK_PAGE);

/**
 * Переход на страницу "Редактирование задачи"
 *
 * @param taskId - идентификатор задачи
 */
const goToEditTaskPage = (taskId: string): void =>
  history.push(PATHS.EDIT_TASK_PAGE.replace(':id', taskId));

/**
 * Переход на страницу "Лабораторные работы по теме"
 *
 * @param topicId - идентификатор темы
 */
const goToLabsPage = (topicId: string): void =>
  history.push(PATHS.LABS_PAGE.replace(':id', topicId));

/**
 * Переход на страницу "Лабораторная работа"
 *
 * @param labId - идентификатор лабораторной работы
 */
const goToLabPage = (labId: string): void =>
  history.push(PATHS.LAB_PAGE.replace(':id', labId));

export const utils = {
  goToHomePage,
  goToAuthorizationPage,
  goToGroupPage,
  goToCreateGroupPage,
  goToEditGroupPage,
  goToGradeBookPage,
  goToTasksPage,
  goToCreateTaskPage,
  goToEditTaskPage,
  goToLabsPage,
  goToLabPage,
};
