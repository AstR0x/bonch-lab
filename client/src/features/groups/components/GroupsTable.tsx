import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Toolbar,
  IconButton,
  Paper,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons';

import { Group } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: '1 1 100%',
    },
    tableRow: {
      cursor: 'pointer',
    },
  }),
);

interface GroupsTableProps {
  groupList: Group[];
  onGetGroup: (id: string) => void;
  onOpenCreateGroupModal: () => void;
  onOpenEditGroupModal: (group: Group) => void;
  onOpenDeleteGroupModal: (group: Group) => void;
}

/**
 * Компонент "Таблица групп"
 *
 * @param groupList - список групп
 * @param onGetGroup - диспатчит экшен получения группы
 * @param onOpenCreateGroupModal - открывает модальное окно добавления группы
 * @param onOpenEditGroupModal - открывает модальное окно редактирования группы
 * @param onOpenDeleteGroupModal - открывает модальное окно удаления группы
 * @returns react-элемент
 */
export const GroupsTable: React.FC<GroupsTableProps> = ({
  groupList,
  onGetGroup,
  onOpenCreateGroupModal,
  onOpenEditGroupModal,
  onOpenDeleteGroupModal,
}) => {
  const [groupId, setGroupId] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (groupId) {
      onGetGroup(groupId);
    }
  }, [groupId]);

  return (
    <TableContainer component={Paper}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} component="div" variant="h6">
          Группы
        </Typography>
        <IconButton onClick={onOpenCreateGroupModal}>
          <Add />
        </IconButton>
      </Toolbar>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell align="center">Студентов</TableCell>
            <TableCell align="center">Кодовое слово</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {groupList.map((group) => (
            <TableRow
              hover
              key={group.id}
              className={classes.tableRow}
              onClick={() => setGroupId(group.id)}
            >
              <TableCell component="th" scope="row">
                {group.name}
              </TableCell>
              <TableCell align="center">{group.students.length}</TableCell>
              <TableCell align="center">{group.codeword}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onOpenEditGroupModal(group)}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton onClick={() => onOpenDeleteGroupModal(group)}>
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
