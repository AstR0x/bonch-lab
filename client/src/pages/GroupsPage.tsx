// @ts-nocheck
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import { useModal } from '@common/hooks';
import {
  GroupsTable,
  StudentsTable,
  CreateGroupModal,
  EditGroupModal,
  DeleteGroupModal,
  CreateGroupPayload,
  groupsSelectors,
} from '@features/groups';
import { groupsProcessActions } from '@processes/groups';

/**
 * Страница "Группы"
 *
 * @returns react-элемент
 */
export const GroupsPage: React.FC = () => {
  const dispatch = useDispatch();
  const groupsList = useSelector(groupsSelectors.groupListSelector);
  const openedGroup = useSelector(groupsSelectors.openedGroupSelector);
  const {
    isOpened: isCreateGroupModalOpened,
    openModal: openCreateGroupModal,
    closeModal: closeCreateGroupModal,
  } = useModal();
  const {
    isOpened: isEditGroupModalOpened,
    openModal: openEditGroupModal,
    closeModal: closeEditGroupModal,
    content: editableGroup,
  } = useModal();
  const {
    isOpened: isDeleteGroupModalOpened,
    openModal: openDeleteGroupModal,
    closeModal: closeDeleteGroupModal,
    content: deletableGroup,
  } = useModal();

  useEffect(() => {
    // Получаем список групп при монтировании
    dispatch(groupsProcessActions.getGroupList());
  }, []);

  /**
   * Диспатчит экшен получения группы
   *
   * @param id - идентификатор группы
   */
  const handleGetGroup = (id: string) => {
    dispatch(groupsProcessActions.getGroup(id));
  };

  /**
   * Обработчик кнопки создания группы
   *
   * @param createGroupPayload - данные группы
   */
  const handleCreateGroup = (createGroupPayload: CreateGroupPayload) => {
    // Диспатчим экшен создания группы
    dispatch(groupsProcessActions.createGroup(createGroupPayload));
    // Закрываем модальное окно
    closeCreateGroupModal();
  };

  /**
   * Обработчик кнопки редактирования группы
   *
   * @param createGroupPayload - данные группы
   */
  const handleEditGroup = (createGroupPayload: CreateGroupPayload) => {
    const { id } = editableGroup;
    // Диспатчим экшен обновления группы
    dispatch(groupsProcessActions.updateGroup({ id, ...createGroupPayload }));
    // Закрываем модальное окно
    closeEditGroupModal();
  };

  /**
   * Обработчик кнопки удаления группы
   *
   * @param id - идентификатор группы
   */
  const handleDeleteGroup = (id: string) => {
    // Диспатчим экшен создания группы
    dispatch(groupsProcessActions.deleteGroup(id));
    // Закрываем модальное окно
    closeDeleteGroupModal();
  };

  return (
    groupsList && (
      <>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <GroupsTable
              groupList={groupsList}
              onGetGroup={handleGetGroup}
              onOpenCreateGroupModal={openCreateGroupModal}
              onOpenEditGroupModal={openEditGroupModal}
              onOpenDeleteGroupModal={openDeleteGroupModal}
            />
          </Grid>
          <Grid item xs={7}>
            {openedGroup && (
              <StudentsTable
                group={openedGroup.name}
                students={openedGroup.students}
              />
            )}
          </Grid>
        </Grid>
        <CreateGroupModal
          isOpened={isCreateGroupModalOpened}
          onCreateGroup={handleCreateGroup}
          onClose={closeCreateGroupModal}
        />
        <EditGroupModal
          isOpened={isEditGroupModalOpened}
          editableGroup={editableGroup}
          onEditGroup={handleEditGroup}
          onClose={closeEditGroupModal}
        />
        <DeleteGroupModal
          isOpened={isDeleteGroupModalOpened}
          deletableGroup={deletableGroup}
          onDeleteGroup={handleDeleteGroup}
          onClose={closeDeleteGroupModal}
        />
      </>
    )
  );
};
