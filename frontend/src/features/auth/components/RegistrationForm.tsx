import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import * as R from 'ramda';

import { PATHS } from '@src/constants';
import { useForm } from '@common/hooks';
import { uiMessages } from '@common/messages';
import { validateName } from '@common/utils';
import { dictionariesSelectors } from '@features/dictionaries';

import { SignUpPayload, RoleEnum } from '../types';
import { utils } from '../utils';

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
}

/**
 * Форма регистрации
 *
 * @param onSignUp - Диспатчит экшен авторизации
 * @returns Форма регистрации
 */
export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSignUp,
}) => {
  const classes = useStyles();
  const groupList = useSelector(dictionariesSelectors.groupListDictSelector);
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
    validators: {
      name: validateName,
      surname: validateName,
      patronymic: validateName,
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
  const isSignUpButtonDisabled = requiredKeys.some(
    (key) => !formState.values[key] || formState.errors[key],
  );

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
            fullWidth
            autoFocus
            autoComplete="off"
            onChange={onTextFieldChange}
            required
          />
          <TextField
            name="name"
            label="Имя"
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="off"
            value={formState.values.name}
            error={formState.errors.name}
            helperText={formState.errors.name && uiMessages.helperTexts.name}
            onChange={onTextFieldChange}
            required
          />
          <TextField
            name="surname"
            label="Фамилия"
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="off"
            value={formState.values.surname}
            error={formState.errors.surname}
            helperText={
              formState.errors.surname && uiMessages.helperTexts.surname
            }
            onChange={onTextFieldChange}
            required
          />
          <TextField
            name="patronymic"
            label="Отчество"
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="off"
            value={formState.values.patronymic}
            error={formState.errors.patronymic}
            helperText={
              formState.errors.patronymic && uiMessages.helperTexts.patronymic
            }
            onChange={onTextFieldChange}
            required
          />
          <TextField
            name="email"
            type="email"
            label="Электронная почта"
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="off"
            value={formState.values.email}
            error={formState.errors.email}
            helperText={formState.errors.email && uiMessages.helperTexts.email}
            onChange={onTextFieldChange}
            required
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
              <MenuItem value={RoleEnum.Student}>Студент</MenuItem>
              <MenuItem value={RoleEnum.Teacher}>Преподаватель</MenuItem>
            </Select>
          </FormControl>
          {formState.values.role === RoleEnum.Student && (
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="group-label">Группа</InputLabel>
              <Select
                label="Группа"
                labelId="group-label"
                name="group"
                value={formState.values.group}
                onChange={onSelectChange}
              >
                {groupList.map((group) => (
                  <MenuItem value={group.id}>{group.title}</MenuItem>
                ))}
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
                to={PATHS.AUTHORIZATION_PAGE}
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
