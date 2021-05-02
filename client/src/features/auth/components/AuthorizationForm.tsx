import React from 'react';
import * as R from 'ramda';
import { Link as RouterLink } from 'react-router-dom';
import { LockOpenOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from '@material-ui/core';

import { URLS } from '@src/constants';
import { useForm } from '@common/hooks';
import { uiMessages } from '@common/messages';

import { SignInPayload } from '../types';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface AuthorizationFormProps {
  // Диспатчит экшен авторизации
  onSignIn: (signInPayload: SignInPayload) => void;
}

/**
 * Форма авторизации
 *
 * @param onSignIn - Диспатчит экшен авторизации
 * @returns Форма авторизации
 */
export const AuthorizationForm: React.FC<AuthorizationFormProps> = ({
  onSignIn,
}) => {
  const classes = useStyles();
  const { formState, onTextFieldChange } = useForm({
    values: { email: '', password: '' },
    errors: {} as Record<keyof Partial<SignInPayload>, boolean>,
  });

  const isSignInButtonDisabled =
    R.values(formState.errors).some((error) => error) ||
    R.values(formState.values).some((value) => !value);

  return (
    <>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Почта"
            name="email"
            type="email"
            onChange={onTextFieldChange}
            value={formState.values.email}
            error={formState.errors.email}
            helperText={formState.errors.email && uiMessages.helperTexts.email}
            autoFocus
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Пароль"
            name="password"
            type="password"
            onChange={onTextFieldChange}
            value={formState.values.password}
            error={formState.errors.password}
            helperText={
              formState.errors.password && uiMessages.helperTexts.password
            }
            required
          />
          <Button
            fullWidth
            type="button"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSignInButtonDisabled}
            onClick={() => onSignIn(formState.values)}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                variant="body2"
                component={RouterLink}
                to={URLS.REGISTRATION_PAGE}
              >
                Зарегистрироваться
              </Link>
            </Grid>
            <Grid item>
              <Link
                variant="body2"
                component={RouterLink}
                to={URLS.PASSWORD_RECOVERY_PAGE}
              >
                Забыли пароль?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};
