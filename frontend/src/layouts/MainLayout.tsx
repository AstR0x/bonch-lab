import React from 'react';
import { useSelector } from 'react-redux';
import { Container, createStyles, makeStyles } from '@material-ui/core';

import { Header, Sidebar } from '@common/components';
import { ErrorLayout, errorsSelectors } from '@features/errors';
import { loadingSelectors, Loader } from '@features/loading';
import { Notification } from '@features/notification';
import { authSelectors } from '@features/auth';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
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
  const errorExist = useSelector(errorsSelectors.isErrorExist);
  const isLoading = useSelector(loadingSelectors.isLoadingSelector);
  const isTeacherAuthorized = useSelector(
    authSelectors.isTeacherAuthorizedSelector,
  );

  return (
    <Container className={classes.root} maxWidth="xl">
      <Loader isLoading={isLoading} />
      <Header />
      <Sidebar isTeacherAuthorized={isTeacherAuthorized} />
      <Container className={classes.content} component="main" maxWidth="xl">
        {errorExist ? <ErrorLayout /> : children}
      </Container>
      <Notification />
    </Container>
  );
};
