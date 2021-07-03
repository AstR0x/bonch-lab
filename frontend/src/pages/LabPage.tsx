import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Paper,
  Typography,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { GetApp } from '@material-ui/icons';

import { useForm } from '@common/hooks';
import { authSelectors } from '@features/auth';
import { dictionariesSelectors } from '@features/dictionaries';
import {
  labsActions,
  labsSelectors,
  labsUtils,
  LAB_STATUS_TITLES,
  Comments,
  LabStatusEnum,
} from '@features/labs';
import { labsProcessActions } from '@processes/labs';
import { tasksProcessActions } from '@processes/tasks';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 900,
    },
    heading: {
      fontWeight: 100,
    },
    status: {
      textTransform: 'uppercase',
    },
    ratingBox: {
      marginTop: theme.spacing(6),
    },
    paper: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(2),
    },
    formulation: {
      whiteSpace: 'pre-wrap',
    },
    buttonsBox: {
      marginTop: theme.spacing(2),
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
  const isStudentAuthorized = useSelector(
    authSelectors.isStudentAuthorizedSelector,
  );
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
        <Typography variant="h4" component="h2" className={classes.heading}>
          {topic}. {structure[topic].title}
        </Typography>
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
      <Typography
        gutterBottom
        variant="h5"
        component="h3"
        className={classes.heading}
      >
        {topic}.{subtopic} {structure[topic].subtopics[subtopic].title}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.ratingBox}
      >
        <Typography gutterBottom variant="body1" component="h5">
          Написать программу решения задачи и загрузить отчёт
        </Typography>
        {lab.task.isAttachmentLoaded ? (
          <Tooltip title="Скачать приложение">
            <IconButton
              onClick={() => handleDownloadTaskAttachment(lab.task.id)}
            >
              <GetApp />
            </IconButton>
          </Tooltip>
        ) : (
          <div />
        )}
      </Box>
      <Paper className={classes.paper}>
        <Typography
          className={classes.formulation}
          gutterBottom
          variant="body1"
          component="p"
        >
          {lab.task.formulation}
        </Typography>
      </Paper>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.buttonsBox}
      >
        {isStudentAuthorized &&
          (labsUtils.isOpenStatus(lab.status) ||
            labsUtils.onRevisionStatus(lab.status)) && (
            <>
              <Button
                type="button"
                color="primary"
                variant="contained"
                disabled={!lab.isReportLoaded}
                onClick={() => handleChangeStatus(LabStatusEnum.OnCheck)}
              >
                На проверку
              </Button>
              <Button component="label" color="primary">
                {lab.isReportLoaded ? 'Обновить отчёт' : 'Загрузить отчёт'}
                <input
                  hidden
                  type="file"
                  name="report"
                  accept=".docx"
                  onChange={onFileInputChange}
                />
              </Button>
            </>
          )}
        {isStudentAuthorized && labsUtils.onCheckStatus(lab.status) && (
          <>
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={() => handleDownloadReport(lab.id)}
            >
              Скачать отчёт
            </Button>
            <Button
              type="button"
              color="secondary"
              onClick={() => handleChangeStatus(LabStatusEnum.Open)}
            >
              Отменить
            </Button>
          </>
        )}
        {!isStudentAuthorized && labsUtils.onCheckStatus(lab.status) && (
          <>
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={() => handleDownloadReport(lab.id)}
            >
              Скачать отчёт
            </Button>
            <Box display="flex">
              <Button
                type="button"
                color="primary"
                onClick={() => handleChangeStatus(LabStatusEnum.Completed)}
              >
                Принять
              </Button>
              <Button
                type="button"
                color="secondary"
                onClick={() => handleChangeStatus(LabStatusEnum.OnRevision)}
              >
                На доработку
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Comments comments={lab.comments} onCreateComment={handleCreateComment} />
    </Box>
  );
};
