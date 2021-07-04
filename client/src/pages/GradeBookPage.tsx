import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import { Heading } from '@common/components';
import { groupsSelectors, GradeBookTable } from '@features/groups';
import { dictionariesSelectors } from '@features/dictionaries';
import { groupsProcessActions } from '@processes/groups';

/**
 * Страница "Журнал успеваемости группы"
 */
export const GradeBookPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const structure = useSelector(dictionariesSelectors.structureSelector);
  const group = useSelector(groupsSelectors.group4TableViewSelector);

  useEffect(() => {
    dispatch(groupsProcessActions.getGroup(id));
  }, []);

  if (!group) return null;

  return (
    <Container maxWidth="xl">
      <Heading>Журнал группы {group.name}</Heading>
      <GradeBookTable group={group} structure={structure} />
    </Container>
  );
};
