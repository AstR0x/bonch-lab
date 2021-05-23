import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PATHS } from '@src/constants';
import { useModal } from '@common/hooks';
import { DeleteModal } from '@common/components';
import { groupsSelectors, GroupTable } from '@features/groups';
import { groupsProcessActions } from '@processes/groups';
import { history } from '@store';

/**
 * Страница "Группа"
 *
 * @returns react-элемент
 */
export const GroupPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const group = useSelector(groupsSelectors.group4TableViewSelector);
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
   * Обработчик кнопки перехода на страницу "Журнал группы"
   */
  const handleMoveToJournalPage = () =>
    history.push(PATHS.JOURNAL_PAGE.replace(':id', group.id));

  /**
   * Обработчик кнопки перехода на страницу "Редактирование группы"
   */
  const handleMoveToEditGroupPage = () =>
    history.push(PATHS.EDIT_GROUP_PAGE.replace(':id', group.id));

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
      {group && (
        <GroupTable
          group={group}
          onMoveToJournalPage={handleMoveToJournalPage}
          onMoveToEditGroupPage={handleMoveToEditGroupPage}
          onOpenDeleteGroupModal={openDeleteGroupModal}
        />
      )}
      <DeleteModal
        isOpened={isDeleteGroupModalOpened}
        modalTitle="Удаление группы"
        modalContent={`Вы действительно хотите удалить группу
         «${deletableGroup?.name}»?`}
        onDeleteItem={handleDeleteGroup}
        onClose={closeDeleteGroupModal}
      />
    </>
  );
};
