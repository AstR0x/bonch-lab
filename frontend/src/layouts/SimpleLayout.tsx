import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Container } from '@material-ui/core';

import { Header } from '@common/components';
import { Notification } from '@features/notification';
import { ErrorLayout, errorsSelectors } from '@features/errors';
import { Loader, loadingSelectors } from '@features/loading';

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
  const errorExist = useSelector(errorsSelectors.isErrorExist);
  const isLoading = useSelector(loadingSelectors.isLoadingSelector);

  return (
    <Container className={classes.root}>
      <Loader isLoading={isLoading} />
      <Header />
      <Container className={classes.content} component="main">
        {errorExist ? <ErrorLayout /> : children}
      </Container>
      <Notification />
    </Container>
  );
};
