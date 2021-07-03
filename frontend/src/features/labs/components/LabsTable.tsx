import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  FormControl,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import * as R from 'ramda';

import { useForm } from '@common/hooks';
import { Structure } from '@features/dictionaries';
import { GetTaskListParams } from '@features/tasks';

import { LAB_STATUS_TITLES } from '../constants';
import { Lab } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      marginTop: theme.spacing(6),
      maxWidth: '900px',
    },
    toolbar: {
      padding: theme.spacing(2, 0, 0, 1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    tableRow: {
      cursor: 'pointer',
    },
    statusCell: {
      whiteSpace: 'nowrap',
    },
  }),
);

interface LabsTableProps {
  topic: number;
  labsList: Lab[];
  structure: Structure;
  onGetLabList: (params: GetTaskListParams) => void;
  onMoveToLabPage: (id: string) => void;
}

/**
 * Компонент "Таблица лабораторных работ"
 *
 * @param topic - тема
 * @param labsList - список лабораторных работ
 * @param structure - структура тем/подтем/уровней
 * @param onGetLabList - выполняет получение списка лабораторных работ
 * @param onMoveToLabPage - выполняет переход на страницу лабораторной работы
 * @returns react-элемент
 */
export const LabsTable: React.FC<LabsTableProps> = ({
  topic,
  labsList,
  structure,
  onGetLabList,
  onMoveToLabPage,
}) => {
  const classes = useStyles();
  const { formState, onSelectChange, resetFormState } = useForm({
    values: { subtopic: 1 },
  });
  const { values } = formState;

  useEffect(() => {
    resetFormState();
  }, [topic]);

  useEffect(() => {
    onGetLabList({ ...formState.values, topic });
  }, [topic, values]);

  const { subtopics } = structure[topic];

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Toolbar className={classes.toolbar}>
        <FormControl className={classes.formControl}>
          <Select
            name="subtopic"
            value={values.subtopic}
            onChange={onSelectChange}
          >
            {R.toPairs(subtopics).map(([subtopic, { title }]) => (
              <MenuItem key={subtopic} value={Number(subtopic)}>
                {topic}.{subtopic}. {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">№</TableCell>
            <TableCell align="left">Условие задачи</TableCell>
            <TableCell align="left">Уровень</TableCell>
            <TableCell align="left">Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {labsList.map((lab, index) => (
            <TableRow
              hover
              key={lab.id}
              className={classes.tableRow}
              onClick={() => onMoveToLabPage(lab.id)}
            >
              <TableCell component="th" scope="row" align="left">
                {index + 1}
              </TableCell>
              <TableCell align="left">{lab.task.formulation}</TableCell>
              <TableCell align="left">
                <Rating
                  readOnly
                  defaultValue={lab.task.level}
                  size="small"
                  max={3}
                />
              </TableCell>
              <TableCell className={classes.statusCell} align="left">
                {LAB_STATUS_TITLES[lab.status]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
