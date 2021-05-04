import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { tasksProcessActions } from '@processes/tasks';

/**
 * Страница "Тема"
 *
 * @returns react-элемент
 */
export const TopicPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tasksProcessActions.getTaskList({ topic: id }));
  }, [id]);

  return <div>ddd</div>;
};
