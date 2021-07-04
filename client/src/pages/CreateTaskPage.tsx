import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import { tasksSelectors, TaskForm, CreateTaskPayload } from '@features/tasks';
import { tasksProcessActions } from '@processes/tasks';

/**
 * Страница "Создание задачи"
 *
 * @returns react-элемент
 */
export const CreateTaskPage: React.FC = () => {
  const dispatch = useDispatch();
  const taskParams = useSelector(tasksSelectors.taskParamsSelector);

  /**
   * Обработчик кнопки создания задачи
   *
   * @param createTaskPayload - данные задачи
   */
  const handleCreateGroup = (createTaskPayload: CreateTaskPayload) =>
    dispatch(tasksProcessActions.createTask(createTaskPayload));

  return (
    <Container maxWidth="xs">
      <TaskForm
        formTitle="Создание задачи"
        confirmButtonText="Создать"
        onConfirm={handleCreateGroup}
        initValues={taskParams}
      />
    </Container>
  );
};
