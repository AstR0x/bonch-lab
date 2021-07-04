import React from 'react';
import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 2,
      color: '#fff',
    },
  }),
);

interface LoaderProps {
  isLoading: boolean;
}

/**
 * Компонент "Лоадер"
 *
 * @param isLoading - флаг загрузки
 * @returns react-элемент
 */
export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
