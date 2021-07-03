import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MenuBook, Edit, Delete } from '@material-ui/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  Paper,
} from '@material-ui/core';

import { Student } from '@features/users';

import { PopulatedGroup } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      maxWidth: '900px',
    },
    toolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface StudentsTableProps {
  group: PopulatedGroup;
  onMoveToJournalPage: () => void;
  onMoveToEditGroupPage: () => void;
  onOpenDeleteStudentModal: (student: Student) => void;
  onOpenDeleteGroupModal: (group: PopulatedGroup) => void;
}

/**
 * Компонент "Таблица группы"
 *
 * @param group - группа
 * @param onMoveToJournalPage - выполняет переход на страницу журнала группы
 * @param onMoveToEditGroupPage - выполняет переход на страницу редактирования группы
 * @param onOpenDeleteStudentModal - открывает модальное окно удаления студента
 * @param onOpenDeleteGroupModal - открывает модальное окно удаления группы
 * @returns react-элемент
 */
export const GroupTable: React.FC<StudentsTableProps> = ({
  group,
  onMoveToJournalPage,
  onMoveToEditGroupPage,
  onOpenDeleteStudentModal,
  onOpenDeleteGroupModal,
}) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} component="div" variant="h6">
          {group.name}
        </Typography>
        <Tooltip title="Открыть журнал">
          <IconButton
            onClick={onMoveToJournalPage}
            disabled={!group.students.length}
          >
            <MenuBook />
          </IconButton>
        </Tooltip>
        <Tooltip title="Редактировать группу">
          <IconButton onClick={onMoveToEditGroupPage}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Удалить группу">
          <IconButton onClick={() => onOpenDeleteGroupModal(group)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Toolbar>
      {group.students.length ? (
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">№</TableCell>
              <TableCell align="left">Студент</TableCell>
              <TableCell align="left">Статус</TableCell>
              <TableCell align="left">Почта</TableCell>
              <TableCell align="left">Дата регистрации</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {group.students.map((student, index) => (
              <TableRow hover key={student.email}>
                <TableCell component="th" scope="row" align="left">
                  {index + 1}
                </TableCell>
                <TableCell align="left">
                  {student.name} {student.patronymic} {student.surname}
                </TableCell>
                <TableCell align="left">{student.status}</TableCell>
                <TableCell align="left">{student.email}</TableCell>
                <TableCell align="left">{student.regDate}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Удалить студента">
                    <IconButton
                      onClick={() => onOpenDeleteStudentModal(student)}
                    >
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
