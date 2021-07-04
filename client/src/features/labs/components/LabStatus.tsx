import React from 'react';
import { createStyles, makeStyles, Typography } from '@material-ui/core';

import { LAB_STATUS_TITLES } from '../constants';
import { LabStatusEnum } from '../types';

const useStyles = makeStyles((theme) =>
  createStyles({
    [LabStatusEnum.Open]: {
      color: theme.palette.primary.main,
    },
    [LabStatusEnum.OnCheck]: {
      color: theme.palette.warning.main,
    },
    [LabStatusEnum.OnRevision]: {
      color: theme.palette.primary.dark,
    },
    [LabStatusEnum.Completed]: {
      color: theme.palette.success.main,
    },
  }),
);

interface LabStatusProps {
  status: LabStatusEnum;
}

export const LabStatus: React.FC<LabStatusProps> = ({ status, ...props }) => {
  const classes = useStyles();

  return (
    <Typography {...props} className={classes[status]}>
      {LAB_STATUS_TITLES[status]}
    </Typography>
  );
};
