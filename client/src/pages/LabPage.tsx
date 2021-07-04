import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Tooltip } from '@material-ui/core';

import { useForm } from '@common/hooks';
import { Heading } from '@common/components';
import { dictionariesSelectors } from '@features/dictionaries';
import {
  labsActions,
  labsSelectors,
  LAB_STATUS_TITLES,
  LabStatusEnum,
  LabFormulation,
  LabActionPanel,
  LabComments,
} from '@features/labs';
import { labsProcessActions } from '@processes/labs';
import { tasksProcessActions } from '@processes/tasks';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 900,
    },
    status: {
      textTransform: 'uppercase',
    },
  }),
);

/**
 * Страница "Лабораторная работа"
 *
 * @returns react-элемент
 */
export const LabPage: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const structure = useSelector(dictionariesSelectors.structureSelector);
  const lab = useSelector(labsSelectors.lab4InterfaceViewSelector);
  const { formState, onFileInputChange } = useForm({
    values: { report: null as File },
  });
  const { report } = formState.values;

  useEffect(() => {
    dispatch(labsProcessActions.getLab(id));

    return () => dispatch(labsActions.deleteLab());
  }, []);

  useEffect(() => {
    if (report) {
      dispatch(labsProcessActions.uploadReport({ id, report }));
    }
  }, [report]);

  /**
   * Обработчик кнопок смены статусов
   *
   * @param status - статус лабораторной работы
   */
  const handleChangeStatus = (status: LabStatusEnum) =>
    dispatch(labsProcessActions.updateLabStatus({ id, status }));

  /**
   * Обработчик кнопки создания комментария
   *
   * @param message - сообщение комментария
   */
  const handleCreateComment = (message: string) =>
    dispatch(labsProcessActions.createComment({ id, message }));

  /**
   * Обработчик кнопки скачивания отчёта
   *
   * @param labId - идентификатор лабораторной работы
   */
  const handleDownloadReport = (labId: string) =>
    dispatch(labsProcessActions.downloadReport(labId));

  /**
   * Скачивание приложения к задаче
   *
   * @param taskId - идентификатор задачи
   */
  const handleDownloadTaskAttachment = (taskId: string) =>
    dispatch(tasksProcessActions.downloadTaskAttachment(taskId));

  if (!lab) return null;

  const { topic, subtopic } = lab.task;

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <Heading>
          {topic}. {structure[topic].title}
        </Heading>
        <Tooltip title="Статус задачи">
          <Typography
            className={classes.status}
            variant="h6"
            component="h2"
            color="primary"
          >
            {LAB_STATUS_TITLES[lab.status]}
          </Typography>
        </Tooltip>
      </Box>
      <Heading variant="h5" component="h3">
        {topic}.{subtopic} {structure[topic].subtopics[subtopic].title}
      </Heading>
      <LabFormulation
        lab={lab}
        onDownloadTaskAttachment={handleDownloadTaskAttachment}
      />
      <LabActionPanel
        lab={lab}
        onChangeStatus={handleChangeStatus}
        onDownloadReport={handleDownloadReport}
        onFileInputChange={onFileInputChange}
      />
      <LabComments
        comments={lab.comments}
        onCreateComment={handleCreateComment}
      />
    </Box>
  );
};
