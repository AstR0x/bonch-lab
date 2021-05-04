import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons';

import { UserInfo, authSelectors } from '@features/auth';
import { authProcessActions } from '@processes/auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    logo: {
      letterSpacing: '.7rem',
      flexGrow: 1,
    },
  }),
);

/**
 * Шапка сайта
 *
 * @returns react-элемент
 */
export const Header: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isUserAuthorized = useSelector(authSelectors.isUserAuthorizedSelector);

  /**
   * Диспатчит экшен выхода из приложения
   */
  const handleSignUp = () => dispatch(authProcessActions.signOut());

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="body1" className={classes.logo}>
          BONCH_LAB
        </Typography>
        {isUserAuthorized && (
          <>
            <UserInfo />
            <Tooltip title="Выйти">
              <IconButton color="inherit" onClick={handleSignUp}>
                <ExitToApp />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
