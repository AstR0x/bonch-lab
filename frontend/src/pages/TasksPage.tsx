import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import { useModal } from '@common/hooks';
import { DeleteModal } from '@common/components';
import { tasksProcessActions } from '@processes/tasks';
import {
  tasksActions,
  tasksSelectors,
  TasksTable,
  TaskParams,
  GetTaskListParams,
} from '@features/tasks';
import { history } from '@store';

import { PATHS } from '../constants';

/**
 * Страница "Задачи по теме"
 *
 * @returns react-элемент
 */
export const TasksPage: React.FC = () => {
  const { id: topic } = useParams();
  const dispatch = useDispatch();
  const taskList = useSelector(tasksSelectors.taskListSelector);
  const structure = useSelector(tasksSelectors.structureSelector);
  const {
    isOpened: isDeleteTaskModalOpened,
    openModal: openDeleteTaskModal,
    closeModal: closeDeleteTaskModal,
    content: deletableTaskId,
  } = useModal();

  useEffect(() => {
    if (!structure) {
      dispatch(tasksProcessActions.getStructure());
    }
  }, []);

  /**
   * Получение списка задач
   *
   * @param params - параметры запроса
   */
  const handleGetTaskList = (params: GetTaskListParams) =>
    dispatch(tasksProcessActions.getTaskList(params));

  /**
   * Обработчик кнопки перехода на страницу "Создание задачи"
   *
   * @param params - параметры задачи (тема/подтема/уровень)
   */
  const handleMoveToCreateTaskPage = (params: TaskParams) => {
    // Записываем в стор параметры задачи
    dispatch(tasksActions.setTaskParams(params));
    // Переходим на страницу создания
    history.push(PATHS.CREATE_TASK_PAGE);
  };

  /**
   * Обработчик кнопки перехода на страницу "Редактирование задачи"
   *
   * @param id - идентификатор задачи, которая будет редактироваться
   */
  const handleMoveToEditTaskPage = (id: string) => {
    const foundTask = taskList.find((task) => task.id === id);
    // Записываем в стор задачу
    dispatch(tasksActions.setOpenedTask(foundTask));
    // Переходим на страницу редактирования
    history.push(PATHS.EDIT_TASK_PAGE.replace(':id', id));
  };

  /**
   * Обработчик кнопки удаления задачи
   */
  const handleDeleteTask = () => {
    // Диспатчим экшен удаления задачи
    dispatch(tasksProcessActions.deleteTask(deletableTaskId));
    // Закрываем модальное окно
    closeDeleteTaskModal();
  };

  if (!structure) {
    return null;
  }

  return (
    <>
      <Typography gutterBottom variant="h4" component="h2">
        {topic}. {structure[topic].title}
      </Typography>
      <TasksTable
        topic={Number(topic)}
        taskList={taskList}
        structure={structure}
        onGetTaskList={handleGetTaskList}
        onMoveToCreateTaskPage={handleMoveToCreateTaskPage}
        onMoveToEditTaskPage={handleMoveToEditTaskPage}
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