import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, LinearProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Sidebar } from '@common/components';
import { ErrorLayout, selectors as errorSelectors } from '@features/errors';
import { selectors as navSelectors } from '@features/navigation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${200}px)`,
      marginLeft: 200,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);

/**
 * Главный макет
 *
 * @returns react-элемент
 */
export const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const pathname = useSelector(navSelectors.pathName);
  const errorExist = useSelector(errorSelectors.isErrorExist);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">BONCH LAB</Typography>
        </Toolbar>
      </AppBar>
      <LinearProgress />
      <Sidebar pathname={pathname} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {errorExist ? <ErrorLayout /> : children}
      </main>
    </div>
  );
};
