import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, TextField, Button, Avatar } from '@material-ui/core';
import { Edit, PlusOne } from '@material-ui/icons';
import * as R from 'ramda';

import { useForm } from '@common/hooks';
import { uiMessages } from '@common/messages';
import { validateGroupName } from '@common/utils';

import { CreateGroupPayload } from '../types';

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
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

interface GroupFormProps {
  formTitle: string;
  confirmButtonText: string;
  initValues?: { codeword: string; name: string };
  onConfirm: (crateGroupPayload: CreateGroupPayload) => void;
}

/**
 * Компонент "Форма группы"
 *
 * @param formTitle - заглавие формы
 * @param confirmButtonText - текст кнопки подтверждения
 * @param initValues - начальные значения формы
 * @param onConfirm - обработчик кнопки подтверждения
 * @returns react-элемент
 */
export const GroupForm: React.FC<GroupFormProps> = ({
  formTitle,
  confirmButtonText,
  initValues,
  onConfirm,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { formState, onTextFieldChange } = useForm({
    values: initValues || { codeword: '', name: '' },
    validators: { name: validateGroupName },
    errors: {} as Record<keyof Partial<CreateGroupPayload>, boolean>,
  });

  const keys = R.keys(formState.values);
  const isValid = keys.every(
    (key) => formState.values[key] && !formState.errors[key],
  );

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        {initValues ? <Edit /> : <PlusOne />}
      </Avatar>
      <Typography component="h1" variant="h5">
        {formTitle}
      </Typography>
      <form className={classes.form}>
        <TextField
          name="codeword"
          label="Кодовое слово"
          variant="outlined"
          margin="normal"
          fullWidth
          autoComplete="off"
          value={formState.values.codeword}
          error={formState.errors.codeword}
          helperText={
            formState.errors.codeword && uiMessages.helperTexts.codeword
          }
          onChange={onTextFieldChange}
          autoFocus
          required
        />
        <TextField
          name="name"
          label="Название группы"
          variant="outlined"
          margin="normal"
          fullWidth
          autoComplete="off"
          value={formState.values.name}
          error={formState.errors.name}
          helperText={
            formState.errors.name && uiMessages.helperTexts.group.name
          }
          onChange={onTextFieldChange}
          required
        />
      </form>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={!isValid}
        onClick={() => onConfirm(formState.values)}
      >
        {confirmButtonText}
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => history.goBack()}
      >
        Отмена
      </Button>
    </div>
  );
};
