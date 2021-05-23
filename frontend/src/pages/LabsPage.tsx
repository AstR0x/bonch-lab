import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { PATHS } from '@src/constants';
import { GetTaskListParams } from '@features/tasks';
import { dictionariesSelectors } from '@features/dictionaries';
import { labsSelectors, LabsTable } from '@features/labs';
import { labsProcessActions } from '@processes/labs';
import { history } from '@store';

const useStyles = makeStyles(() =>
  createStyles({
    heading: {
      fontWeight: 100,
    },
  }),
);

/**
 * Страница "Лабораторные работы по теме"
 *
 * @returns react-элемент
 */
export const LabsPage: React.FC = () => {
  const classes = useStyles();
  const { id: topic } = useParams();
  const dispatch = useDispatch();
  const labsList = useSelector(labsSelectors.labListSelector);
  const structure = useSelector(dictionariesSelectors.structureSelector);

  /**
   * Получение списка лабораторных работ
   *
   * @param params - параметры запроса
   */
  const handleGetLabsList = (params: GetTaskListParams) =>
    dispatch(labsProcessActions.getLabList(params));

  /**
   * Обработчик кнопки перехода на страницу "Лабораторная работа"
   *
   * @param id - идентификатор лабораторной работы
   */
  const handleMoveToLabPage = (id: string) =>
    history.push(PATHS.LAB_PAGE.replace(':id', id));

  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        className={classes.heading}
      >
        {topic}. {structure[topic].title}
      </Typography>
      <LabsTable
        topic={topic}
        labsList={labsList}
        structure={structure}
        onGetLabList={handleGetLabsList}
        onMoveToLabPage={handleMoveToLabPage}
      />
    </>
  );
};
