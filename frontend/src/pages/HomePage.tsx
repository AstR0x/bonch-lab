import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      fontWeight: 300,
      textIndent: '.7rem',
      letterSpacing: '.7rem',
      marginLeft: '-12px',
    },
  }),
);

/**
 * Главная страница
 */
export const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography
        className={classes.title}
        variant="h3"
        color="primary"
        gutterBottom
        noWrap
      >
        BONCH_LAB
      </Typography>
      <Typography variant="h5" color="primary">
        Сайт для выполнения лабораторных работ на языке
        <br />
        программирования Java
      </Typography>
    </>
  );
};
