import React, { useEffect } from 'react';
import * as R from 'ramda';
import {
  Theme,
  makeStyles,
  createStyles,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
} from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons';

import { useForm } from '@common/hooks';
import {
  Task,
  Structure,
  TaskParams,
  GetTaskListParams,
} from '@features/tasks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      marginTop: theme.spacing(6),
      maxWidth: '900px',
    },
    toolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    grow: {
      flexGrow: 1,
    },
    buttonsTd: {
      whiteSpace: 'nowrap',
    },
  }),
);

interface TasksTableProps {
  topic: number;
  taskList: Task[];
  structure: Structure;
  onGetTaskList: (params: GetTaskListParams) => void;
  onMoveToCreateTaskPage: (params: TaskParams) => void;
  onMoveToEditTaskPage: (id: string) => void;
  onOpenDeleteTaskModal: (id: string) => void;
}

/**
 * Компонент "Таблица задач"
 *
 * @param topic - тема
 * @param taskList - список задач
 * @param structure - структура тем/под/уровней
 * @param onGetTaskList - выполняет получение списка задач
 * @param onMoveToCreateTaskPage - выполняет переход на страницу создания задачи
 * @param onMoveToEditTaskPage - выполняет переход на страницу редактирования задачи
 * @param onOpenDeleteTaskModal - открывает модальное окно удаления задачи
 * @returns react-элемент
 */
export const TasksTable: React.FC<TasksTableProps> = ({
  topic,
  taskList,
  structure,
  onGetTaskList,
  onMoveToCreateTaskPage,
  onMoveToEditTaskPage,
  onOpenDeleteTaskModal,
}) => {
  const classes = useStyles();
  const { formState, onSelectChange } = useForm({
    values: { subtopic: 1, level: 1 },
  });
  const { values } = formState;

  useEffect(() => {
    onGetTaskList({ topic, ...values });
  }, [topic, values]);

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Toolbar className={classes.toolbar}>
        <FormControl className={classes.formControl}>
          <Select
            name="subtopic"
            value={values.subtopic}
            onChange={onSelectChange}
          >
            {R.toPairs(structure[topic].subtopics).map(
              ([subtopic, { title }]) => (
                <MenuItem key={subtopic} value={Number(subtopic)}>
                  {topic}.{subtopic}. {title}
                </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select
            name="level"
            value={formState.values.level}
            onChange={onSelectChange}
          >
            {R.toPairs(structure[topic].subtopics[values.subtopic].levels).map(
              ([level, { title }]) => (
                <MenuItem key={level} value={Number(level)}>
                  {level}. {title}
                </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
        <div className={classes.grow} />
        <Tooltip title="Добавить задачу">
          <IconButton
            onClick={() => onMoveToCreateTaskPage({ topic, ...values })}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </Toolbar>
      {taskList.length ? (
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">№</TableCell>
              <TableCell align="left">Условие задачи</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList.map((task, index) => (
              <TableRow hover key={task.id}>
                <TableCell component="th" scope="row" align="left">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{task.formulation}</TableCell>
                <TableCell align="right" className={classes.buttonsTd}>
                  <Tooltip title="Редактировать задачу">
                    <IconButton onClick={() => onMoveToEditTaskPage(task.id)}>
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Удалить задачу">
                    <IconButton onClick={() => onOpenDeleteTaskModal(task.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </TableContainer>
  );
};
