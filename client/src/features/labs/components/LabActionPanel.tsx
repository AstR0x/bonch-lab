import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';

import { authSelectors } from '@features/auth';
import { labsUtils, PopulatedLab, LabStatusEnum } from '@features/labs';

const useStyles = makeStyles((theme) =>
  createStyles({
    actionPanel: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface ActionPanelProps {
  lab: PopulatedLab;
  onChangeStatus: (status: LabStatusEnum) => void;
  onDownloadReport: (labId: string) => void;
  onFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Компонент "Панель действий"
 *
 * @param lab - лабораторная работа
 * @param onChangeStatus - изменяет статус лабораторной работы
 * @param onDownloadReport - выполняет скачивание лабораторной работы
 * @param onFileInputChange - обрабатывает изменения в файловом input
 * @returns react-элемент
 */
export const LabActionPanel: React.FC<ActionPanelProps> = ({
  lab,
  onChangeStatus,
  onDownloadReport,
  onFileInputChange,
}) => {
  const classes = useStyles();
  const isStudentAuthorized = useSelector(
    authSelectors.isStudentAuthorizedSelector,
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      className={classes.actionPanel}
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
              onClick={() => onChangeStatus(LabStatusEnum.OnCheck)}
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
            onClick={() => onDownloadReport(lab.id)}
          >
            Скачать отчёт
          </Button>
          <Button
            type="button"
            color="secondary"
            onClick={() => onChangeStatus(LabStatusEnum.Open)}
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
            onClick={() => onDownloadReport(lab.id)}
          >
            Скачать отчёт
          </Button>
          <Box display="flex">
            <Button
              type="button"
              color="primary"
              onClick={() => onChangeStatus(LabStatusEnum.Completed)}
            >
              Принять
            </Button>
            <Button
              type="button"
              color="secondary"
              onClick={() => onChangeStatus(LabStatusEnum.OnRevision)}
            >
              На доработку
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
