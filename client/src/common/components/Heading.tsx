import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, TypographyVariant } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    heading: {
      fontWeight: 100,
    },
  }),
);

interface PageHeadingProps {
  variant?: TypographyVariant;
  component?: React.ElementType<any>;
}

/**
 * Компонент "Заголовок"
 */
export const Heading: React.FC<PageHeadingProps> = ({
  variant = 'h4',
  component = 'h2',
  children,
}) => {
  const classes = useStyles();

  return (
    <Typography
      variant={variant}
      component={component}
      className={classes.heading}
    >
      {children}
    </Typography>
  );
};
