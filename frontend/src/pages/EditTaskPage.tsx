import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import * as R from 'ramda';

import { tasksSelectors, TaskForm, UpdateTaskPayload } from '@features/tasks';
import { tasksProcessActions } from '@processes/tasks';

/**
 * Страница "Редактирование задачи"
 *
 * @returns react-элемент
 */
export const EditTaskPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const openedTask = useSelector(tasksSelectors.openedTaskSelector);

  useEffect(() => {
    if (!openedTask) {
      // Диспатчим экшен получения задачи
      dispatch(tasksProcessActions.getTask(id));
    }
  }, []);

  /**
   * Обработчик кнопки редактирования задачи
   *
   * @param updateTaskPayload - данные задачи
   */
  const handleUpdateTask = (updateTaskPayload: UpdateTaskPayload) =>
    dispatch(tasksProcessActions.updateTask({ id, ...updateTaskPayload }));

  if (!openedTask) {
    return null;
  }

  return (
    <Container maxWidth="xs">
      <TaskForm
        formTitle="Редактирование задачи"
        confirmButtonText="Сохранить"
        onConfirm={handleUpdateTask}
        initValues={R.omit(['id'], openedTask)}
      />
    </Container>
  );
};
