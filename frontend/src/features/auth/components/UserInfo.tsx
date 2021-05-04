import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { selectors } from '../selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userInfo: {
      marginRight: theme.spacing(2),
    },
  }),
);

/**
 * Компонент "Информация о пользователе"
 *
 * @returns react-компонент
 */
export const UserInfo: React.FC = () => {
  const classes = useStyles();
  const userInfo = useSelector(selectors.userInfoSelector);

  return (
    <Typography variant="body2" className={classes.userInfo}>
      {userInfo.shortName}
      <br />
      {userInfo.role}
    </Typography>
  );
};
