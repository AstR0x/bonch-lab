// @ts-nocheck
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
} from '@material-ui/core';
import * as R from 'ramda';
import clsx from 'clsx';

import { LAB_STATUS_DESIGNATIONS, LAB_STATUS_TITLES } from '@features/labs';
import { Structure } from '@features/dictionaries';
import { navUtils } from '@features/navigation';

import { PopulatedGroup } from '../types';

const useStyles = makeStyles((theme) =>
  createStyles({
    gradeBookTable: {
      marginTop: theme.spacing(6),
    },
    cell: {
      padding: theme.spacing(1),
      borderLeft: '1px rgba(224, 224, 224, 1) solid',
    },
    studentName: {
      whiteSpace: 'nowrap',
    },
    labStatus: {
      cursor: 'pointer',
    },
  }),
);

interface StudentsTableProps {
  group: PopulatedGroup;
  structure: Structure;
}

/**
 * Компонент "Таблица успеваемости группы"
 *
 * @param group - группа
 * @param structure - структура тем/подтем/уровней
 * @returns react-элемент
 */
export const GradeBookTable: React.FC<StudentsTableProps> = ({
  group,
  structure,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.gradeBookTable}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            {R.toPairs(structure).map(([topic, { subtopics }]) =>
              R.toPairs(subtopics).map(([subtopic, { levels }]) =>
                R.keys(levels).map((level) => (
                  <TableCell key={level} align="left" className={classes.cell}>
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
                className={classes.studentName}
                component="td"
                align="left"
              >
                {student.shortName}
              </TableCell>
              {student.labs.map((lab) => (
                <Tooltip key={lab.id} title={LAB_STATUS_TITLES[lab.status]}>
                  <TableCell
                    className={clsx(classes.cell, classes.labStatus)}
                    onClick={() => navUtils.goToLabPage(lab.id)}
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
  );
};
