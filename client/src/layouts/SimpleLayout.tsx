import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Container } from '@material-ui/core';

import { Header } from '@common/components';
import { Notification } from '@features/notification';
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
  const isLoading = useSelector(loadingSelectors.isLoadingSelector);

  return (
    <Container className={classes.root}>
      <Loader isLoading={isLoading} />
      <Header />
      <Container className={classes.content} component="main">
        {children}
      </Container>
      <Notification />
    </Container>
  );
};
