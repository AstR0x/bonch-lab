import React from 'react';
import { useSelector } from 'react-redux';
import { Container, createStyles, makeStyles } from '@material-ui/core';

import { Header } from '@common/components';
import { Notification } from '@features/notification';
import { ErrorLayout, selectors as errorSelectors } from '@features/errors';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      paddingTop: 64,
    },
  }),
);

/**
 * Макет без боковой панели
 *
 * @returns react-элемент
 */
export const SimpleLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const errorExist = useSelector(errorSelectors.isErrorExist);

  return (
    <Container className={classes.root}>
      <Header />
      <Container component="main" className={classes.content}>
        {errorExist ? <ErrorLayout /> : children}
      </Container>
      <Notification />
    </Container>
  );
};
