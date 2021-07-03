import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Header, Sidebar } from '@common/components';
import { loadingSelectors, Loader } from '@features/loading';
import { dictionariesSelectors } from '@features/dictionaries';
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
  const isLoading = useSelector(loadingSelectors.isLoadingSelector);
  const structure = useSelector(dictionariesSelectors.structureSelector);
  const isTeacherAuthorized = useSelector(
    authSelectors.isTeacherAuthorizedSelector,
  );

  if (!structure) return null;

  return (
    <Container className={classes.root} maxWidth="xl">
      <Loader isLoading={isLoading} />
      <Header />
      <Sidebar isTeacherAuthorized={isTeacherAuthorized} />
      <Container className={classes.content} component="main" maxWidth="xl">
        {children}
      </Container>
      <Notification />
    </Container>
  );
};
