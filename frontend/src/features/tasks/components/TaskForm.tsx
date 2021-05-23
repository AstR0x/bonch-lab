import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as R from 'ramda';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from '@material-ui/core';

import { useForm } from '@common/hooks';
import { uiMessages } from '@common/messages';
import { dictionariesSelectors } from '@features/dictionaries';

import { CreateTaskPayload } from '../types';

export const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface TaskFormProps {
  formTitle: string;
  confirmButtonText: string;
  initValues?: {
    topic: number;
    subtopic: number;
    level: number;
    formulation: string;
  };
  onConfirm: (createTaskPayload: CreateTaskPayload) => void;
}

/**
 * Форма задачи.
 *
 * @param formTitle - заглавие формы
 * @param confirmButtonText - текст кнопки подтверждения
 * @param initValues - начальные значения формы
 * @param onConfirm - обработчик кнопки подтверждения
 * @returns react-элемент
 */
export const TaskForm: React.FC<TaskFormProps> = ({
  formTitle,
  confirmButtonText,
  initValues,
  onConfirm,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const structure = useSelector(dictionariesSelectors.structureSelector);
  const topics = useSelector(dictionariesSelectors.topicsDictSelector);
  const { formState, onTextFieldChange, onSelectChange } = useForm({
    values: initValues || { topic: 1, subtopic: 1, level: 1, formulation: '' },
    errors: {} as Record<keyof Partial<CreateTaskPayload>, boolean>,
  });
  const { values, errors } = formState;
  const isValid = values.formulation && !errors.formulation;

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {formTitle}
      </Typography>
      <form className={classes.form}>
        <TextField
          name="formulation"
          label="Условие задачи"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          autoComplete="off"
          value={values.formulation}
          error={errors.formulation}
          helperText={errors.formulation && uiMessages.helperTexts.required}
          onChange={onTextFieldChange}
          required
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="topic-label">Тема</InputLabel>
          <Select
            label="Тема"
            labelId="topic-label"
            name="topic"
            value={values.topic}
            onChange={onSelectChange}
          >
            {topics.map(({ id, title }) => (
              <MenuItem key={id} value={Number(id)}>
                {id}. {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="subtopic-label">Подтема</InputLabel>
          <Select
            label="Подтема"
            labelId="subtopic-label"
            name="subtopic"
            value={values.subtopic}
            onChange={onSelectChange}
          >
            {R.toPairs(structure[values.topic].subtopics).map(
              ([id, { title }]) => (
                <MenuItem key={id} value={Number(id)}>
                  {values.topic}.{id}. {title}
                </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="level-label">Уровень</InputLabel>
          <Select
            label="Уровень"
            labelId="level-label"
            name="level"
            value={values.level}
            onChange={onSelectChange}
          >
            {R.toPairs(
              structure[values.topic].subtopics[values.subtopic]?.levels,
            ).map(([id, { title }]) => (
              <MenuItem key={id} value={Number(id)}>
                {id}. {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
