import React from 'react';
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
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import { OpenedGroup } from '@features/groups';

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
  openedGroup: OpenedGroup;
  onMoveToEditGroupPage: () => void;
  onOpenDeleteGroupModal: (group: OpenedGroup) => void;
}

/**
 * Компонент "Таблица группы"
 *
 * @param openedGroup - открытая группа
 * @param onMoveToEditGroupPage - выполняет переход на страницу редактирования группы
 * @param onOpenDeleteGroupModal - открывает модальное окно удаления группы
 * @returns react-элемент
 */
export const GroupTable: React.FC<StudentsTableProps> = ({
  openedGroup,
  onMoveToEditGroupPage,
  onOpenDeleteGroupModal,
}) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} component="div" variant="h6">
          {openedGroup.name}
        </Typography>
        <Tooltip title="Редактировать группу">
          <IconButton onClick={onMoveToEditGroupPage}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Удалить группу">
          <IconButton onClick={() => onOpenDeleteGroupModal(openedGroup)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Toolbar>
      {openedGroup.students.length ? (
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
            {openedGroup.students.map((student, index) => (
              <TableRow hover key={student.email}>
                <TableCell component="th" scope="row" align="left">
                  {index + 1}
                </TableCell>
                <TableCell align="left">
                  {student.name} {student.surname} {student.patronymic}
                </TableCell>
                <TableCell align="left">{student.status}</TableCell>
                <TableCell align="left">{student.email}</TableCell>
                <TableCell align="left">{student.regDate}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Удалить студента">
                    <IconButton onClick={() => ({})}>
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
