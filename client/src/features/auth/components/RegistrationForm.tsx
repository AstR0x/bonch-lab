import React, { useEffect } from 'react';
import * as R from 'ramda';
import { Link as RouterLink } from 'react-router-dom';
import { AccountBoxOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Avatar,
  Typography,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
  Link,
} from '@material-ui/core';

import { URLS } from '@src/constants';
import { useForm } from '@common/hooks';
import { uiMessages } from '@common/messages';
import { SignUpPayload, RoleEnum, utils } from '@features/auth';

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  formControlLabel: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface RegistrationFormProps {
  onSignUp: (signUpPayload: SignUpPayload) => void;
  isSignUpLoading: boolean;
}

/**
 * Форма регистрации
 *
 * @param onSignUp - Диспатчит экшен авторизации
 * @param isSignUpLoading - Идёт загрузка при регистрации ?
 * @returns Форма регистрации
 */
export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSignUp,
  isSignUpLoading,
}) => {
  const classes = useStyles();
  const { formState, resetValue, onTextFieldChange, onSelectChange } = useForm({
    values: {
      codeword: '',
      name: '',
      surname: '',
      patronymic: '',
      email: '',
      password: '',
      role: '' as RoleEnum,
      group: '',
    },
    errors: {} as Record<keyof Partial<SignUpPayload>, boolean>,
  });

  useEffect(() => {
    if (utils.isTeacher(formState.values.role)) {
      resetValue('group');
    }
  }, [formState.values.role]);

  const optionalKeys = utils.isTeacher(formState.values.role) ? ['group'] : [];
  const requiredValues = R.omit(optionalKeys, formState.values);
  const requiredKeys = R.keys(requiredValues);
  const isSignUpButtonDisabled =
    requiredKeys.some(
      (key) => !formState.values[key] || formState.errors[key],
    ) || isSignUpLoading;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBoxOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            name="codeword"
            label="Кодовое слово"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            autoComplete="off"
            onChange={onTextFieldChange}
          />
          <TextField
            name="name"
            label="Имя"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="off"
            value={formState.values.name}
            error={formState.errors.name}
            helperText={formState.errors.name && uiMessages.helperTexts.name}
            onChange={onTextFieldChange}
          />
          <TextField
            name="surname"
            label="Фамилия"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="off"
            value={formState.values.surname}
            error={formState.errors.surname}
            helperText={
              formState.errors.surname && uiMessages.helperTexts.surname
            }
            onChange={onTextFieldChange}
          />
          <TextField
            name="patronymic"
            label="Отчество"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="off"
            value={formState.values.patronymic}
            error={formState.errors.patronymic}
            helperText={
              formState.errors.patronymic && uiMessages.helperTexts.patronymic
            }
            onChange={onTextFieldChange}
          />
          <TextField
            name="email"
            type="email"
            label="Электронная почта"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="off"
            value={formState.values.email}
            error={formState.errors.email}
            helperText={formState.errors.email && uiMessages.helperTexts.email}
            onChange={onTextFieldChange}
          />
          <TextField
            name="password"
            type="password"
            label="Пароль"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={formState.values.password}
            error={formState.errors.password}
            helperText={
              formState.errors.password && uiMessages.helperTexts.password
            }
            onChange={onTextFieldChange}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="role-label">Роль</InputLabel>
            <Select
              label="Роль"
              labelId="role-label"
              name="role"
              value={formState.values.role}
              onChange={onSelectChange}
            >
              <MenuItem value={RoleEnum.student}>Студент</MenuItem>
              <MenuItem value={RoleEnum.teacher}>Преподаватель</MenuItem>
            </Select>
          </FormControl>
          {formState.values.role === RoleEnum.student && (
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="group-label">Группа</InputLabel>
              <Select
                label="Группа"
                labelId="group-label"
                name="group"
                value={formState.values.group}
                onChange={onSelectChange}
              >
                <MenuItem value="60819a7d892db727e8e3effa">ИКПИ-71</MenuItem>
              </Select>
            </FormControl>
          )}
          <Button
            className={classes.submit}
            color="primary"
            variant="contained"
            fullWidth
            disabled={isSignUpButtonDisabled}
            onClick={() => onSignUp(requiredValues as SignUpPayload)}
          >
            Зарегистрироваться
          </Button>
          <Grid container>
            <Grid item>
              <Link
                variant="body2"
                component={RouterLink}
                to={URLS.AUTHORIZATION_PAGE}
              >
                Авторизоваться
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
