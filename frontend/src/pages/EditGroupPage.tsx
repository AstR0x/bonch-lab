import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import * as R from 'ramda';

import {
  groupsSelectors,
  GroupForm,
  CreateGroupPayload,
} from '@features/groups';
import { groupsProcessActions } from '@processes/groups';

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
  const handleEditGroup = (createGroupPayload: CreateGroupPayload) =>
    dispatch(groupsProcessActions.updateGroup({ id, ...createGroupPayload }));

  if (!openedGroup) {
    return null;
  }

  return (
    <Container maxWidth="xs">
      <GroupForm
        formTitle="Редактирование группы"
        confirmButtonText="Сохранить"
        onConfirm={handleEditGroup}
        initValues={R.pick(['name', 'codeword'], openedGroup)}
      />
    </Container>
  );
};
