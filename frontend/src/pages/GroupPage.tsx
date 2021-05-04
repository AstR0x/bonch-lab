import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PATHS } from '@src/constants';
import { useModal } from '@common/hooks';
import {
  GroupTable,
  DeleteGroupModal,
  groupsSelectors,
} from '@features/groups';
import { groupsProcessActions } from '@processes/groups';
import { history } from '@store';

/**
 * Страница "Группа"
 *
 * @returns react-элемент
 */
export const GroupPage: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const openedGroup = useSelector(
    groupsSelectors.openedGroup4TableViewSelector,
  );
  const {
    isOpened: isDeleteGroupModalOpened,
    openModal: openDeleteGroupModal,
    closeModal: closeDeleteGroupModal,
    content: deletableGroup,
  } = useModal();

  useEffect(() => {
    // Диспатчим экшен получения группы
    dispatch(groupsProcessActions.getGroup(id));
  }, [id]);

  /**
   * Обработчик кнопки перехода на страницу "Редактирование группы"
   */
  const handleMoveToEditGroupPage = () =>
    history.push(PATHS.EDIT_GROUP_PAGE.replace(':id', openedGroup.id));

  /**
   * Обработчик кнопки удаления группы
   */
  const handleDeleteGroup = () => {
    // Диспатчим экшен удаления группы
    dispatch(groupsProcessActions.deleteGroup(id));
    // Закрываем модальное окно
    closeDeleteGroupModal();
  };

  return (
    <>
      {openedGroup && (
        <GroupTable
          openedGroup={openedGroup}
          onMoveToEditGroupPage={handleMoveToEditGroupPage}
          onOpenDeleteGroupModal={openDeleteGroupModal}
        />
      )}
      <DeleteGroupModal
        isOpened={isDeleteGroupModalOpened}
        deletableGroup={deletableGroup}
        onDeleteGroup={handleDeleteGroup}
        onClose={closeDeleteGroupModal}
      />
    </>
  );
};
