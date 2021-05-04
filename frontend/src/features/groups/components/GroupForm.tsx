import React from 'react';
import * as R from 'ramda';
import { useHistory } from 'react-router';
import { Typography, TextField, Button, makeStyles } from '@material-ui/core';

import { useForm } from '@common/hooks';
import { uiMessages } from '@common/messages';
import { validateGroupName } from '@common/utils';

import { CreateGroupPayload } from '../types';

export const useStyles = makeStyles((theme) => ({
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
  values?: { codeword: string; name: string };
  onConfirm: (crateGroupPayload: CreateGroupPayload) => void;
}

/**
 * Форма группы.
 *
 * @param formTitle - заглавие формы
 * @param confirmButtonText - текст кнопки подтверждения
 * @param values - начальные значения формы
 * @param onConfirm - обработчик кнопки подтверждения
 * @returns react-элемент
 */
export const GroupForm: React.FC<GroupFormProps> = ({
  formTitle,
  confirmButtonText,
  values,
  onConfirm,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { formState, onTextFieldChange } = useForm({
    values: values || { codeword: '', name: '' },
    validators: { name: validateGroupName },
    errors: {} as Record<keyof Partial<CreateGroupPayload>, boolean>,
  });

  const keys = R.keys(formState.values);
  const isValid = keys.every(
    (key) => formState.values[key] && !formState.errors[key],
  );

  return (
    <div className={classes.paper}>
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
