import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import * as R from 'ramda';

import { tasksSelectors, TaskForm, CreateTaskPayload } from '@features/tasks';
import { tasksProcessActions } from '@processes/tasks';

/**
 * Страница "Редактирование задачи"
 *
 * @returns react-элемент
 */
export const EditTaskPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector(tasksSelectors.taskSelector);

  useEffect(() => {
    if (!task) {
      dispatch(tasksProcessActions.getTask(id));
    }
  }, []);

  /**
   * Обработчик кнопки редактирования задачи
   *
   * @param createTaskPayload - данные задачи
   */
  const handleUpdateTask = (createTaskPayload: CreateTaskPayload) =>
    dispatch(tasksProcessActions.updateTask({ id, ...createTaskPayload }));

  if (!task) return null;

  return (
    <Container maxWidth="xs">
      <TaskForm
        formTitle="Редактирование задачи"
        confirmButtonText="Сохранить"
        onConfirm={handleUpdateTask}
        initValues={R.omit(['id'], task)}
      />
    </Container>
  );
};
