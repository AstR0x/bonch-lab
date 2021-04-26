import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';

import { Header, Sidebar } from '@common/components';
import { ErrorLayout, selectors as errorSelectors } from '@features/errors';
import { selectors as navSelectors } from '@features/navigation';
import { Notification } from '@features/notification';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      width: '100%',
      padding: theme.spacing(3),
      paddingTop: 128,
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
    <Container className={classes.root}>
      <Header />
      <Sidebar pathname={pathname} />
      <Container component="main" className={classes.content}>
        {errorExist ? <ErrorLayout /> : children}
      </Container>
      <Notification />
    </Container>
  );
};
