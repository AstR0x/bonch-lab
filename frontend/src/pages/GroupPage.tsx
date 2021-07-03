import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PATHS } from '@src/constants';
import { useModal } from '@common/hooks';
import { DeleteModal } from '@common/components';
import { groupsSelectors, GroupTable } from '@features/groups';
import { userProcessActions } from '@processes/users';
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
  const {
    isOpened: isDeleteStudentModalOpened,
    openModal: openDeleteStudentModal,
    closeModal: closeDeleteStudentModal,
    content: deletableStudent,
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
   * Обработчик кнопки удаления студента
   */
  const handleDeleteStudent = () => {
    dispatch(userProcessActions.deleteStudent(deletableStudent.id));
    closeDeleteStudentModal();
  };

  /**
   * Обработчик кнопки удаления группы
   */
  const handleDeleteGroup = () => {
    dispatch(groupsProcessActions.deleteGroup(deletableGroup.id));
    closeDeleteGroupModal();
  };

  return (
    <>
      {group && (
        <GroupTable
          group={group}
          onMoveToJournalPage={handleMoveToJournalPage}
          onMoveToEditGroupPage={handleMoveToEditGroupPage}
          onOpenDeleteStudentModal={openDeleteStudentModal}
          onOpenDeleteGroupModal={openDeleteGroupModal}
        />
      )}
      <DeleteModal
        isOpened={isDeleteStudentModalOpened}
        modalTitle="Удаление студента"
        modalContent="Вы действительно хотите удалить студента?"
        onDeleteItem={handleDeleteStudent}
        onClose={closeDeleteStudentModal}
      />
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
