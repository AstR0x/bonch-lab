import React from 'react';
import { Container } from '@material-ui/core';

import { GroupsTable } from '@features/groups';

/**
 * Страница "Группы"
 *
 * @returns react-элемент
 */
export const GroupsPage: React.FC = () => {
  return (
    <>
      <Container component="div" maxWidth="xl">
        <GroupsTable />
      </Container>
    </>
  );
};
