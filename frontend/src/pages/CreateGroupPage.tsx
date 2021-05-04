import React from 'react';
import { useDispatch } from 'react-redux';

import { groupsProcessActions } from '@processes/groups';
import { GroupForm, CreateGroupPayload } from '@features/groups';
import { Container } from '@material-ui/core';

/**
 * Страница "Создание группы"
 *
 * @returns react-элемент
 */
export const CreateGroupPage: React.FC = () => {
  const dispatch = useDispatch();

  /**
   * Обработчик кнопки создания группы
   *
   * @param createGroupPayload - данные группы
   */
  const handleCreateGroup = (createGroupPayload: CreateGroupPayload) => {
    // Диспатчим экшен создания группы
    dispatch(groupsProcessActions.createGroup(createGroupPayload));
  };

  return (
    <Container maxWidth="xs">
      <GroupForm
        formTitle="Создание группы"
        confirmButtonText="Создать"
        onConfirm={handleCreateGroup}
      />
    </Container>
  );
};
