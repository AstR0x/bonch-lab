import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import {
  groupsSelectors,
  GroupForm,
  CreateGroupPayload,
} from '@features/groups';
import { groupsProcessActions } from '@processes/groups';
import { useParams } from 'react-router-dom';

/**
 * Страница "Редактирование группы"
 *
 * @returns react-элемент
 */
export const EditGroupPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const openedGroup = useSelector(groupsSelectors.openedGroupSelector);

  useEffect(() => {
    if (!openedGroup) {
      dispatch(groupsProcessActions.getGroup(id));
    }
  }, []);

  /**
   * Обработчик кнопки редактирования группы
   *
   * @param createGroupPayload - данные группы
   */
  const handleEditGroup = (createGroupPayload: CreateGroupPayload) => {
    dispatch(groupsProcessActions.updateGroup({ id, ...createGroupPayload }));
  };

  return (
    <Container maxWidth="xs">
      {openedGroup && (
        <GroupForm
          formTitle="Редактирование группы"
          confirmButtonText="Сохранить"
          onConfirm={handleEditGroup}
          values={{
            name: openedGroup.name,
            codeword: openedGroup.codeword,
          }}
        />
      )}
    </Container>
  );
};