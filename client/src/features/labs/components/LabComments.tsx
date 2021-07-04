// @ts-nocheck
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
} from '@material-ui/core';

import { useForm } from '@common/hooks';

import { PopulatedComment } from '../types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(16),
  },
  heading: {
    fontWeight: 100,
    marginTop: theme.spacing(4),
  },
  list: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    margin: theme.spacing(2, 0),
  },
  messageInput: {
    width: '40%',
  },
}));

interface CommentsProps {
  comments: PopulatedComment[];
  onCreateComment: (message: string) => void;
}

/**
 * Компонент "Комментарии к лабораторной работе"
 *
 * @param comments - комментарии
 * @param onCreateComment - обработчик кнопки создания комментария
 * @returns react-элемент
 */
export const LabComments: React.FC<CommentsProps> = ({
  comments,
  onCreateComment,
}) => {
  const classes = useStyles();
  const { formState, onTextFieldChange, resetFormState } = useForm({
    values: { message: '' },
    errors: { message: false },
  });

  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.heading}>
        Комментарии
      </Typography>
      {comments.length ? (
        <List className={classes.list} disablePadding>
          {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="аватар" />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography>{comment.author.shortName}</Typography>}
                  secondary={comment.message}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : null}
      <Box
        display="flex"
        className={classes.form}
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
          name="message"
          label="Сообщение"
          autoComplete="off"
          className={classes.messageInput}
          value={formState.values.message}
          onChange={onTextFieldChange}
          multiline
          required
        />
        <Button
          onClick={() => {
            onCreateComment(formState.values.message);
            resetFormState();
          }}
          disabled={!formState.values.message}
          variant="contained"
          color="primary"
        >
          Отправить
        </Button>
      </Box>
    </Box>
  );
};
