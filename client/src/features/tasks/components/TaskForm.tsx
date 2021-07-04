// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, PlusOne } from '@material-ui/icons';
import {
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Avatar,
} from '@material-ui/core';
import * as R from 'ramda';

import { useForm } from '@common/hooks';
import { uiMessages } from '@common/messages';
import { dictionariesSelectors } from '@features/dictionaries';

import { CreateTaskPayload } from '../types';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
  avatar: {
    margin: theme.spacing(1, 'auto'),
    backgroundColor: theme.palette.secondary.main,
  },
  heading: {
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  attachButton: {
    marginTop: theme.spacing(2),
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  button: {
    width: '45%',
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
 * Компонент "Форма задачи"
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
  const {
    formState,
    onTextFieldChange,
    onSelectChange,
    onFileInputChange,
    resetValue,
  } = useForm({
    values: initValues
      ? R.merge(initValues, { attachment: null as File })
      : {
          topic: 1,
          subtopic: 1,
          level: 1,
          formulation: '',
          attachment: null as File,
        },
    errors: {} as Record<keyof Partial<CreateTaskPayload>, boolean>,
  });
  const { values, errors } = formState;
  const isValid = values.formulation && !errors.formulation;

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        {initValues?.formulation ? <Edit /> : <PlusOne />}
      </Avatar>
      <Typography className={classes.heading} component="h1" variant="h5">
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
      {values.attachment ? (
        <Button
          fullWidth
          color="secondary"
          className={classes.attachButton}
          onClick={() => resetValue('attachment')}
        >
          Удалить вложение
        </Button>
      ) : (
        <Button
          fullWidth
          color="primary"
          component="label"
          className={classes.attachButton}
        >
          {formState.values.isAttachmentLoaded ? 'Обновить' : 'Загрузить'}{' '}
          вложение
          <input
            hidden
            type="file"
            accept=".docx"
            name="attachment"
            onChange={onFileInputChange}
          />
        </Button>
      )}
      <div className={classes.buttonsContainer}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!isValid}
          onClick={() => onConfirm(formState.values)}
        >
          {confirmButtonText}
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => history.goBack()}
        >
          Отмена
        </Button>
      </div>
    </div>
  );
};
