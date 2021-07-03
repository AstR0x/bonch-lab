// @ts-nocheck
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import * as R from 'ramda';
import clsx from 'clsx';

import { LAB_STATUS_DESIGNATIONS, LAB_STATUS_TITLES } from '@features/labs';
import { groupsSelectors } from '@features/groups';
import { dictionariesSelectors } from '@features/dictionaries';
import { groupsProcessActions } from '@processes/groups';
import { history } from '@store';

import { PATHS } from '../constants';

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      fontWeight: 100,
    },
    tableContainer: {
      marginTop: theme.spacing(6),
    },
    studentNameCell: {
      whiteSpace: 'nowrap',
    },
    tableCell: {
      padding: theme.spacing(1),
      borderLeft: '1px rgba(224, 224, 224, 1) solid',
    },
    statusCell: {
      cursor: 'pointer',
    },
  }),
);

/**
 * Страница "Журнал группы"
 */
export const JournalPage: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const structure = useSelector(dictionariesSelectors.structureSelector);
  const group = useSelector(groupsSelectors.group4TableViewSelector);

  useEffect(() => {
    dispatch(groupsProcessActions.getGroup(id));
  }, []);

  /**
   * Обработчик кнопки перехода на страницу "Лабораторная работа"
   *
   * @param labId - идентификатор лабораторной работы
   */
  const handleMoveToLabPage = (labId: string) =>
    history.push(PATHS.LAB_PAGE.replace(':id', labId));

  if (!group) return null

  return (
    <Container maxWidth="xl">
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        className={classes.heading}
      >
        Журнал группы {group.name}
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              {R.toPairs(structure).map(([topic, { subtopics }]) =>
                R.toPairs(subtopics).map(([subtopic, { levels }]) =>
                  R.keys(levels).map((level) => (
                    <TableCell
                      key={level}
                      align="left"
                      className={classes.tableCell}
                    >
                      {topic}.{subtopic}.{level}
                    </TableCell>
                  )),
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {group.students.map((student) => (
              <TableRow key={student.id}>
                <TableCell
                  className={classes.studentNameCell}
                  component="td"
                  align="left"
                >
                  {student.shortName}
                </TableCell>
                {student.labs.map((lab) => (
                  <Tooltip key={lab.id} title={LAB_STATUS_TITLES[lab.status]}>
                    <TableCell
                      className={clsx(classes.tableCell, classes.statusCell)}
                      onClick={() => handleMoveToLabPage(lab.id)}
                      component="td"
                      align="center"
                    >
                      {LAB_STATUS_DESIGNATIONS[lab.status]}
                    </TableCell>
                  </Tooltip>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
