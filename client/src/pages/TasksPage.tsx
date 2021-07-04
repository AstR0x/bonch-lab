import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { useModal } from '@common/hooks';
import { DeleteModal, Heading } from '@common/components';
import { tasksProcessActions } from '@processes/tasks';
import { dictionariesSelectors } from '@features/dictionaries';
import { navUtils } from '@features/navigation';
import {
  tasksActions,
  tasksSelectors,
  TasksTable,
  TaskParams,
  GetTaskListParams,
} from '@features/tasks';

/**
 * Страница "Задачи по теме"
 *
 * @returns react-элемент
 */
export const TasksPage: React.FC = () => {
  const { id: topic } = useParams();
  const dispatch = useDispatch();
  const taskList = useSelector(tasksSelectors.taskListSelector);
  const structure = useSelector(dictionariesSelectors.structureSelector);
  const {
    isOpened: isDeleteTaskModalOpened,
    openModal: openDeleteTaskModal,
    closeModal: closeDeleteTaskModal,
    content: deletableTaskId,
  } = useModal();

  /**
   * Получение списка задач
   *
   * @param params - параметры запроса
   */
  const handleGetTaskList = (params: GetTaskListParams) =>
    dispatch(tasksProcessActions.getTaskList(params));

  /**
   * Скачивание приложения к задаче
   *
   * @param id - идентификатор задачи
   */
  const handleDownloadTaskAttachment = (id: string) =>
    dispatch(tasksProcessActions.downloadTaskAttachment(id));

  /**
   * Обработчик кнопки перехода на страницу "Создание задачи"
   *
   * @param params - параметры задачи (тема/подтема/уровень)
   */
  const handlegoToCreateTaskPage = (params: TaskParams) => {
    dispatch(tasksActions.setTaskParams(params));

    navUtils.goToCreateTaskPage();
  };

  /**
   * Обработчик кнопки перехода на страницу "Редактирование задачи"
   *
   * @param id - идентификатор задачи, которая будет редактироваться
   */
  const handlegoToEditTaskPage = (id: string) => {
    const foundTask = taskList.find((task) => task.id === id);

    dispatch(tasksActions.setTask(foundTask));

    navUtils.goToEditTaskPage(id);
  };

  /**
   * Обработчик кнопки удаления задачи
   */
  const handleDeleteTask = () => {
    dispatch(tasksProcessActions.deleteTask(deletableTaskId));

    closeDeleteTaskModal();
  };

  return (
    <>
      <Heading>
        {topic}. {structure[topic].title}
      </Heading>
      <TasksTable
        topic={Number(topic)}
        taskList={taskList}
        structure={structure}
        onGetTaskList={handleGetTaskList}
        onDownloadTaskAttachment={handleDownloadTaskAttachment}
        ongoToCreateTaskPage={handlegoToCreateTaskPage}
        ongoToEditTaskPage={handlegoToEditTaskPage}
        onOpenDeleteTaskModal={openDeleteTaskModal}
      />
      <DeleteModal
        isOpened={isDeleteTaskModalOpened}
        modalTitle="Удаление задачи"
        modalContent="Вы действительно хотите удалить задачу?"
        onDeleteItem={handleDeleteTask}
        onClose={closeDeleteTaskModal}
      />
    </>
  );
};
