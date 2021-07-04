import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useModal } from '@common/hooks';
import { DeleteModal } from '@common/components';
import { groupsSelectors, GroupTable } from '@features/groups';
import { userProcessActions } from '@processes/users';
import { groupsProcessActions } from '@processes/groups';

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
    dispatch(groupsProcessActions.getGroup(id));
  }, [id]);

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
