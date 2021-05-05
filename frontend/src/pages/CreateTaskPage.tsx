import React, { useEffect } from 'react';
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
  const structure = useSelector(tasksSelectors.structureSelector);
  const taskParams = useSelector(tasksSelectors.taskParamsSelector);

  useEffect(() => {
    if (!structure) {
      dispatch(tasksProcessActions.getStructure());
    }
  }, []);

  /**
   * Обработчик кнопки создания задачи
   *
   * @param createTaskPayload - данные задачи
   */
  const handleCreateGroup = (createTaskPayload: CreateTaskPayload) => {
    // Диспатчим экшен создания задачи
    dispatch(tasksProcessActions.createTask(createTaskPayload));
  };

  if (!structure) {
    return null;
  }

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
