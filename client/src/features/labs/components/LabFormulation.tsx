import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';

import { PopulatedLab } from '@features/labs';

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginTop: theme.spacing(6),
    },
    paper: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(2),
    },
    formulation: {
      whiteSpace: 'pre-wrap',
    },
  }),
);

interface ActionPanelProps {
  lab: PopulatedLab;
  onDownloadTaskAttachment: (taskId: string) => void;
}

/**
 * Компонент "Постановка к лабораторной работе"
 *
 * @param lab - лабораторная работа
 * @param onDownloadTaskAttachment - выполняет загрузку приложения к задаче
 * @returns react-элемент
 */
export const LabFormulation: React.FC<ActionPanelProps> = ({
  lab,
  onDownloadTaskAttachment,
}) => {
  const classes = useStyles();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.header}
      >
        <Typography gutterBottom variant="body1" component="h5">
          Написать программу решения задачи и загрузить отчёт
        </Typography>
        {lab.task.isAttachmentLoaded ? (
          <Tooltip title="Скачать приложение">
            <IconButton onClick={() => onDownloadTaskAttachment(lab.task.id)}>
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
    </>
  );
};
